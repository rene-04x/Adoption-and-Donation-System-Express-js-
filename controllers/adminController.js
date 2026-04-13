const path = require('path');
const db = require('../Database/db');

// Helper para sa pagpapadala ng admin files
const sendAdminFile = (req, res, fileName) => {
    res.sendFile(path.join(__dirname, '../public/admin', fileName));
};

// --- PAGE RENDERERS ---
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