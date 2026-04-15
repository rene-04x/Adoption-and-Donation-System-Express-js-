
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { isAuthenticated } = require('../middleware/auth');
const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');
const db = require('../Database/db'); // I-import ang connection natin
const upload = require('../middleware/uploads');
const multer = require('multer'); // Idagdag mo ito sa Line 1

// --- AUTHENTICATION & DASHBOARD ROUTES ---
router.get('/api/user', (req, res) => {
    if (req.session && req.session.username) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false, username: 'Guest' });
    }
});

router.get('/api/user-donations', isAuthenticated, userController.getDonationsAPI);
router.get('/dashboard', isAuthenticated, userController.getDashboard);
router.get('/profile', isAuthenticated, userController.getProfile);
router.get('/donations', isAuthenticated, userController.getDonations);
router.get('/application', isAuthenticated, userController.getApplication);
router.get('/kamustahan', userController.getKamustahan);

// User-specific Hubs

// Announcements page route
router.get('/announcements', isAuthenticated, (req, res) => {
    console.log('HIT /announcements route');
    res.sendFile(path.join(__dirname, '../public/user/announcements.html'));
});

router.get('/adoption_hub', (req, res) => res.sendFile(path.join(__dirname, '../public/user/adoption_hub.html')));
router.get('/sidebar', (req, res) => res.sendFile(path.join(__dirname, '../public/user/sidebar.html')));

// --- ADOPTION APPLICATION ROUTES ---
// Configure Multer Storage
// --- ADOPTION APPLICATION ROUTES ---
// 1. I-define muna ang storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'public/uploads/applications/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 2. Ngayon, pwede mo nang gamitin ang 'storage' variable dito
const uploadApp = multer({ storage: storage });

// --- POST ROUTE (CREATE) ---
// --- POST ROUTE (CREATE) ---
router.post('/api/submit-application', uploadApp.fields([
    { name: 'validId', maxCount: 1 }, 
    { name: 'proofAddress', maxCount: 1 }
]), async (req, res) => {
    try {
        const data = req.body;
        const files = req.files || {};
        
        // 1. Kuhanin ang userId mula sa session
        // Tandaan: Dapat 'userId' ang tawag mo rito kung yun ang nilagay mo nung login
        const loggedInUserId = req.session.userId; 

        if (!loggedInUserId) {
            return res.status(401).json({ success: false, message: "Session expired. Please login again." });
        }

        const validIdPath = files['validId'] ? `/uploads/applications/${files['validId'][0].filename}` : null;
        const proofAddressPath = files['proofAddress'] ? `/uploads/applications/${files['proofAddress'][0].filename}` : null;

        const livingTypeString = Array.isArray(data.livingType) 
            ? data.livingType.join(', ') 
            : (data.livingType || '');

        // 2. Isama ang user_id sa SQL command
        const sql = `INSERT INTO adoption_applications 
            (user_id, pet_name, last_name, given_name, middle_name, birthdate, email, phone, fb_link, contact_method, employment_status, pet_experience, living_type, fenced_yard, pets_allowed, reason_adoption, valid_id_path, proof_address_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // 3. Siguraduhing tumutugma ang order ng values
        const values = [
            loggedInUserId, // Ang uupo sa user_id column
            data.petName, 
            data.lName, 
            data.gName, 
            data.mName || null, 
            data.bday, 
            data.email, 
            data.phone, 
            data.fb, 
            data.contact, 
            data.jobStatus, 
            data.exp || 'No', 
            livingTypeString, 
            data.fence, 
            data.allowed, 
            data.reason,
            validIdPath, 
            proofAddressPath
        ];

        const [result] = await db.execute(sql, values);
        res.json({ success: true, insertId: result.insertId });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Failed to save application." });
    }
});

// 2. UPDATE (PUT) - Idagdag ang upload middleware dito!


    router.put('/api/update-application/:id', uploadApp.fields([
    { name: 'validId', maxCount: 1 }, 
    { name: 'proofAddress', maxCount: 1 }
]), async (req, res) => {
    try {
        const applicationId = req.params.id;
        
        // Ngayong may upload.fields na tayo, ang req.body ay hindi na magiging undefined
        const { 
            lName, gName, mName, bday, email, 
            phone, fb, contact, jobStatus, exp, 
            livingType, fence, allowed, reason 
        } = req.body;

        // I-handle ang livingType array (mula sa checkboxes)
        const livingTypeString = Array.isArray(livingType) ? livingType.join(', ') : (livingType || '');

        const sql = `UPDATE adoption_applications SET 
            last_name = ?, given_name = ?, middle_name = ?, birthdate = ?, email = ?, 
            phone = ?, fb_link = ?, contact_method = ?, employment_status = ?, 
            pet_experience = ?, living_type = ?, fenced_yard = ?, pets_allowed = ?, 
            reason_adoption = ? WHERE id = ?`;

        const values = [
            lName, gName, mName || null, bday, email, 
            phone, fb, contact, jobStatus, exp || 'No', 
            livingTypeString, fence, allowed, reason, 
            applicationId
        ];

        const [result] = await db.execute(sql, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        res.json({ success: true, message: 'Application updated successfully!' });

    } catch (error) {
        console.error("UPDATE ERROR:", error.message);
        res.status(500).json({ success: false, message: 'Update Error: ' + error.message });
    }
});


// This is your existing route - ensure the table has a 'status' column
router.delete('/api/cancel-application/:id', async (req, res) => {
    try {
        const applicationId = req.params.id;
        // This updates the row instead of deleting it
        const sql = "UPDATE adoption_applications SET status = 'Cancelled' WHERE id = ?";
        const [result] = await db.execute(sql, [applicationId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        res.json({ success: true, message: 'Application cancelled' });
    } catch (error) {
        console.error("CANCEL ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});router.get('/api/get-applications', isAuthenticated, async (req, res) => {
    try {
        const { status } = req.query;
        const loggedInUserId = req.session.userId; // Kunin ang ID ng user

        // Idagdag ang WHERE user_id = ? para sariling applications lang ang makita
        let sql = "SELECT id, pet_name AS petName, status, date_applied FROM adoption_applications WHERE user_id = ?";
        let params = [loggedInUserId];

        if (status === 'Success') {
            sql += " AND (status = 'Success' OR status = 'Approved')";
        } 
        else if (status === 'Active') {
            sql += " AND status IN ('Active', 'Submitted', 'Interview', 'Interview Scheduled')";
        } 
        else if (status === 'Cancelled') {
            sql += " AND status = 'Cancelled'";
        }

        sql += " ORDER BY date_applied DESC";
        const [rows] = await db.execute(sql, params);
        
        const formattedRows = rows.map(row => ({
            ...row,
            created_at: row.date_applied 
        }));

        res.json(formattedRows); 
    } catch (error) {
        console.error("Fetch API Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
router.get('/api/application-details/:id', isAuthenticated, async (req, res) => {
    try {
        const [rows] = await db.execute(
            // Dagdagan ng AND user_id = ? para sigurado
            "SELECT *, pet_name AS petName, date_applied AS created_at FROM adoption_applications WHERE id = ? AND user_id = ?", 
            [req.params.id, req.session.userId]
        );
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ message: "Not found or Unauthorized" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// --- OTHER PAGES ---
router.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../public/landing_page/about.html')));
router.get('/donate', (req, res) => res.sendFile(path.join(__dirname, '../public/landing_page/donate.html')));
router.get('/policy', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/policy.html')));
router.get('/terms', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/terms.html')));
router.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/contact.html')));
router.get('/faqs', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/faqs.html')));

// Ang route para sa donation
router.post('/submit-donation', upload.single('receipt'), userController.submitDonation);


// Catch-all for userRoutes (for debugging)
router.use((req, res, next) => {
    console.warn(`[userRoutes 404] Resource not found: ${req.originalUrl}`);
    next();
});

module.exports = router;