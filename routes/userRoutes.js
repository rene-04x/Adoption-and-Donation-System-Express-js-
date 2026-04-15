const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { isAuthenticated } = require('../middleware/auth');
const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');
const db = require('../Database/db'); 
const upload = require('../middleware/uploads');
const multer = require('multer'); 

// --- AUTHENTICATION & DASHBOARD ROUTES ---
router.get('/api/user', (req, res) => {
    if (req.session && req.session.username) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false, username: 'Guest' });
    }
});

// 1. Configure storage para sa profile pictures
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'public/uploads/profile_pics/';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, 'profile-' + req.session.userId + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadProfile = multer({ storage: profileStorage });

// 2. Route para i-save ang image path sa DB
router.post('/api/update-profile-pic', isAuthenticated, uploadProfile.single('profile_pic'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

        const imagePath = `/uploads/profile_pics/${req.file.filename}`;
        const userId = req.session.userId;

        
        await db.execute("UPDATE users SET profile_pic = ? WHERE id = ?", [imagePath, userId]);

        res.json({ success: true, imagePath: imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get('/api/user-donations', isAuthenticated, userController.getDonationsAPI);
router.get('/dashboard', isAuthenticated, userController.getDashboard);
router.get('/profile', isAuthenticated, userController.getProfile);
// Kunin ang profile details ng naka-login na user
// Sa iyong routes file
router.get('/api/user-profile-details', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userId;
        // DAPAT KASAMA ANG profile_pic DITO
        const [rows] = await db.execute("SELECT username, email, profile_pic FROM users WHERE id = ?", [userId]);

        if (rows.length > 0) {
            res.json({ 
                success: true, 
                username: rows[0].username, 
                email: rows[0].email,
                profilePic: rows[0].profile_pic, 
                accountType: 'User'
            });
        } else {
            res.status(404).json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ success: false });
    }
});
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

// --- HTML EXTENSION ROUTE FIXES ---
// Redirect .html URLs to correct routes for compatibility, but require authentication first
router.get('/donations.html', isAuthenticated, (req, res) => res.redirect('/donations'));
router.get('/application.html', isAuthenticated, (req, res) => res.redirect('/application'));
router.get('/adoption_hub.html', isAuthenticated, (req, res) => res.redirect('/adoption_hub'));


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


const uploadApp = multer({ storage: storage });

// --- POST ROUTE (CREATE) ---
router.post('/api/submit-application', uploadApp.fields([
    { name: 'validId', maxCount: 1 }, 
    { name: 'proofAddress', maxCount: 1 }
]), async (req, res) => {
    try {
        const data = req.body;
        const files = req.files || {};
        
        const loggedInUserId = req.session.userId; 

        if (!loggedInUserId) {
            return res.status(401).json({ success: false, message: "Session expired. Please login again." });
        }

        const validIdPath = files['validId'] ? `/uploads/applications/${files['validId'][0].filename}` : null;
        const proofAddressPath = files['proofAddress'] ? `/uploads/applications/${files['proofAddress'][0].filename}` : null;

        const livingTypeString = Array.isArray(data.livingType) 
            ? data.livingType.join(', ') 
            : (data.livingType || '');

     
        const sql = `INSERT INTO adoption_applications 
            (user_id, pet_name, last_name, given_name, middle_name, birthdate, email, phone, fb_link, contact_method, employment_status, pet_experience, living_type, fenced_yard, pets_allowed, reason_adoption, valid_id_path, proof_address_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      
        const values = [
            loggedInUserId, 
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
        
       
        const { 
            lName, gName, mName, bday, email, 
            phone, fb, contact, jobStatus, exp, 
            livingType, fence, allowed, reason 
        } = req.body;

        
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



router.delete('/api/cancel-application/:id', async (req, res) => {
    try {
        const applicationId = req.params.id;
       
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
        const loggedInUserId = req.session.userId; 

        
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