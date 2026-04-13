const fs = require('fs');
const path = require('path');
const db = require('../Database/db');

const renderUserPage = (req, res, fileName, errorMsg) => {
    if (!req.session.userId) {
        return res.redirect('/login?error=unauthorized');
    }

    // 2. Kunin ang username mula sa SESSION (hindi sa query string para mas secure)
    const username = req.session.username || 'User';
    const filePath = path.join(__dirname, '../public/user', fileName);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(errorMsg);
        // Palitan ang {{username}} sa HTML mo ng totoong pangalan mula sa session
        res.send(data.replace(/{{username}}/g, username));
    });
};

// Sa controllers/userController.js
exports.getDonationsAPI = async (req, res) => {
    try {
        const userId = req.session.userId; 
        
        // QUERY UPDATE: Gagamit ng LEFT JOIN para makuha ang rejection details
        const query = `
            SELECT 
                d.*, 
                r.reason AS rejection_reason, 
                r.proof_path AS rejection_proof_img, 
                r.notes AS rejection_notes,
                r.rejected_at AS rejection_date
            FROM donations d
            LEFT JOIN rejection_logs r ON d.id = r.donation_id
            WHERE d.user_id = ? 
            ORDER BY d.date DESC
        `;
        
        const [rows] = await db.query(query, [userId]);

        res.json(rows); 
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Failed to fetch donations" });
    }
};

// user's donation submission handler
exports.submitDonation = async (req, res) => {
    try {
        const userId = req.session.userId || null; 
        const { type, donorName, amount, item_name, email, phone, refNo } = req.body;

        const receiptImg = req.file ? req.file.filename : null;
        const paymentMethod = (type === 'cash') ? 'GCash' : null;

        const sql = `INSERT INTO donations 
            (user_id, donor_name, type, amount, item_name, email, phone, payment_method, ref_no, date, receipt_img, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 'Pending')`;

        // DITO ANG FIX:
        // Siguraduhin na ang 'amount' ay Number o NULL (hindi string na "null")
        const validatedAmount = (amount && amount !== "null" && amount !== "") ? parseFloat(amount) : null;

        const values = [
            userId, 
            donorName, 
            type, 
            validatedAmount, // Gamitin ang validated version
            item_name || null, 
            email || null, 
            phone || null, 
            paymentMethod, 
            refNo || null, 
            receiptImg
        ];

        await db.query(sql, values);
        return res.status(200).json({ success: true, message: "Donation recorded successfully!" });

    } catch (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.getDashboard = (req, res) => renderUserPage(req, res, 'dashboard.html', "Error loading Dashboard");
exports.getProfile = (req, res) => renderUserPage(req, res, 'profile.html', "Error loading Profile");
exports.getDonations = (req, res) => renderUserPage(req, res, 'donations.html', "Error loading Donations");
exports.getApplication = (req, res) => renderUserPage(req, res, 'application.html', "Error loading Application");
exports.getKamustahan = (req, res) => renderUserPage(req, res, 'kamustahan.html', "Error loading Kamustahan");