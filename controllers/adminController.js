
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

exports.getHome = (req, res) => sendAdminFile(req, res, 'home.html');
exports.getAnimals = (req, res) => sendAdminFile(req, res, 'animals.html');
exports.getAdoptions = (req, res) => sendAdminFile(req, res, 'adoptions.html');
exports.getDonations = (req, res) => sendAdminFile(req, res, 'donation.html');
exports.getAnalytics = (req, res) => sendAdminFile(req, res, 'analytics.html');
exports.getMonitoring = (req, res) => sendAdminFile(req, res, 'monitoring.html');
exports.getOrganizations = (req, res) => sendAdminFile(req, res, 'organizations.html');
exports.getAnnouncements = (req, res) => sendAdminFile(req, res, 'announcement.html');