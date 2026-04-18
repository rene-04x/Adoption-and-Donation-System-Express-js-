const path = require('path');
const db = require('../Database/db');

// Helper para sa pagpapadala ng admin files
const sendAdminFile = (req, res, fileName) => {
    res.sendFile(path.join(__dirname, '../public/admin', fileName));
};

// Kunin lahat ng donations kasama ang rejection details (kung meron)
exports.getAllDonationsAPI = async (req, res) => {
    try {
        // Gagamit ng LEFT JOIN para isama ang data mula sa rejection_logs
        const query = `
            SELECT 
                d.*, 
                r.reason AS rejection_reason, 
                r.proof_path AS rejection_proof_img, 
                r.notes AS rejection_notes,
                r.rejected_at AS rejection_date
            FROM donations d
            LEFT JOIN rejection_logs r ON d.id = r.donation_id
            ORDER BY d.date DESC
        `;
        
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Failed to fetch all donations" });
    }
};

exports.rejectDonation = async (req, res) => {
    const { donationId, reason, notes } = req.body;
    const proofFilename = req.file ? req.file.filename : null;

    try {
        await db.query('BEGIN');

        // Update status sa main donations table
        await db.execute('UPDATE donations SET status = "Rejected" WHERE id = ?', [donationId]);

        // Insert details sa rejection_logs table
        await db.execute(
            `INSERT INTO rejection_logs (donation_id, reason, proof_path, notes) 
             VALUES (?, ?, ?, ?)`,
            [donationId, reason, proofFilename, notes]
        );

        await db.query('COMMIT');
        res.json({ success: true, message: "Donation rejected successfully" });
    } catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.verifyDonation = async (req, res) => {
    const { donationId } = req.body;

    try {
        // I-update ang status sa Verified
        const [result] = await db.execute(
            'UPDATE donations SET status = "verified" WHERE id = ?', 
            [donationId]
        );

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Donation verified successfully" });
        } else {
            res.status(404).json({ error: "Donation not found" });
        }
    } catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getHome = (req, res) => sendAdminFile(req, res, 'home.html');
exports.getAnimals = (req, res) => sendAdminFile(req, res, 'animals.html');
exports.getAdoptions = (req, res) => sendAdminFile(req, res, 'adoptions.html'); 
exports.getDonations = (req, res) => sendAdminFile(req, res, 'donation.html');
exports.getAnalytics = (req, res) => sendAdminFile(req, res, 'analytics.html');
exports.getMonitoring = (req, res) => sendAdminFile(req, res, 'monitoring.html');
exports.getOrganizations = (req, res) => sendAdminFile(req, res, 'organizations.html');
exports.getAnnouncements = (req, res) => sendAdminFile(req, res, 'announcement.html');

// --- API LOGIC ---

// 1. Fetch lahat ng active applications para sa table
exports.getAllAdoptions = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                id, 
                CONCAT(given_name, ' ', last_name) AS applicant_name, 
                email, 
                pet_name, 
                status, 
                date_applied 
            FROM adoption_applications 
            WHERE status != 'Withdrawn'
            ORDER BY date_applied DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error("SQL Error in getAllAdoptions:", error);
        res.status(500).json({ error: error.message });
    }
};

// 2. Fetch specific details para sa Manage Modal
exports.getAdoptionDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`SELECT * FROM adoption_applications WHERE id = ?`, [id]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "Application not found" });
        }
    } catch (error) {
        console.error("SQL Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// 3. Update Status (Approve / Decline / Soft Delete)
exports.updateAdoptionStatus = async (req, res) => {
    const appId = req.params.id;
    const { status, admin_notes } = req.body;

    try {
        const sql = "UPDATE adoption_applications SET status = ?, admin_notes = ? WHERE id = ?";
        const [result] = await db.query(sql, [status, admin_notes, appId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Application not found." });
        }

        res.status(200).json({ 
            success: true, 
            message: `Application successfully marked as ${status}.` 
        });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Database error occurred." });
    }
};

// 4. Schedule Interview
exports.scheduleInterview = async (req, res) => {
    const appId = req.params.id;
    const { interview_date, interview_time, interview_method } = req.body;

    if (!interview_date || !interview_time || !appId) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    try {
        const sql = `
            UPDATE adoption_applications 
            SET interview_date = ?, 
                interview_time = ?, 
                interview_method = ?, 
                status = 'Interview Scheduled' 
            WHERE id = ?`;

        const [result] = await db.query(sql, [interview_date, interview_time, interview_method, appId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Application not found." });
        }

        res.status(200).json({ 
            success: true, 
            message: "Interview scheduled successfully!" 
        });
    } catch (error) {
        console.error("SQL Error:", error);
        res.status(500).json({ success: false, message: "Database error occurred." });
    }
};
exports.getAdoptionStats = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                COUNT(CASE WHEN status = 'Interview Scheduled' OR status = 'Active' THEN 1 END) AS pendingCount,
                COUNT(CASE WHEN status = 'Approved' THEN 1 END) AS successCount
            FROM adoption_applications
        `);
        
        // Siguraduhin na laging may number na ibabalik
        res.json({
            pendingCount: rows[0].pendingCount || 0,
            successCount: rows[0].successCount || 0
        });
    } catch (error) {
        console.error("Error fetching adoption stats:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getRecentDonations = async (req, res) => {
    try {
        const query = `
            SELECT 
                DATE_FORMAT(date, '%m-%d-%Y') as formatted_date,
                donor_name,
                type,
                amount,
                item_name
            FROM donations 
            WHERE status = 'verified'
            ORDER BY date DESC 
            LIMIT 5
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching recent donations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// adminController.js
exports.getMonthlyAdoptionStats = async (req, res) => {
    try {
        const query = `
            SELECT 
                DATE_FORMAT(date_applied, '%b') as month, 
                COUNT(*) as count 
            FROM adoption_applications 
            WHERE LOWER(status) = 'approved' 
              AND YEAR(date_applied) = YEAR(CURDATE())
            GROUP BY MONTH(date_applied), month
            ORDER BY MONTH(date_applied) ASC
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching monthly adoptions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getMonthlyDonationStats = async (req, res) => {
    try {
        const query = `
            SELECT 
                DATE_FORMAT(date, '%b') as month,
                SUM(CASE WHEN type = 'Cash' THEN amount ELSE 0 END) as cash_total,
                COUNT(CASE WHEN type != 'Cash' THEN 1 END) as inkind_count
            FROM donations
            WHERE status = 'verified' 
              AND YEAR(date) = YEAR(CURDATE())
            GROUP BY MONTH(date), month
            ORDER BY MONTH(date) ASC
        `;
        const [rows] = await db.query(query);
        res.json(rows); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};