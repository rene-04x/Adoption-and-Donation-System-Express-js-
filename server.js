const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer'); // 👈 ADD HERE
const upload = multer({ dest: 'public/uploads/' });
// 1. IMPORT ROUTES
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// 2. IMPORT MIDDLEWARES
const logger = require('./middleware/logger');
const { isAdmin } = require('./middleware/auth');

//to use session
const session = require('express-session');

app.use(session({
    secret: 'PAWSsion_Safe_Key_2026_@dm1n', // Kahit anong string na mahaba
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // Mag-e-expire ang login after 1 hour
}));


// 3. SET UP MIDDLEWARES (Dapat mauna ang mga ito bago ang Routes)
app.use(logger); // Custom Logger Middleware para sa "Excellent" rating
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Para sa static assets gaya ng CSS at Images

// Protected Admin Routes - dadaan muna sa isAdmin auth check
app.use('/admin', isAdmin, adminRoutes); 

// Para mabasa ang images sa browser
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// User and Auth Routes
app.use('/', userRoutes);
app.use('/', authRoutes);

// 5. LANDING PAGE (Main Route)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/landing_page/index.html'));
});

// DATABASE CONNECTION 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'adoption_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to get all animals with their medical history
app.get('/api/animals', (req, res) => {
    const query = `
    SELECT 
        a.animal_id,
        a.name,
        a.species,
        a.gender,
        a.breed,
        a.age_months AS age,
        a.color_markings AS color,
        a.behavior_traits AS traits,
        a.current_status AS status,
        a.rescue_area AS rescue_location,
        a.rescue_date,
        a.rescue_story,
        a.profile_photo AS image_url,
        GROUP_CONCAT(
            JSON_OBJECT(
                'treatment', m.treatment_name, 
                'date', m.date_administered, 
                'by', m.administered_by
            )
        ) AS medical_history
    FROM animals a
    LEFT JOIN animal_medical_history m 
    ON a.animal_id = m.animal_id
    GROUP BY a.animal_id`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});
app.put('/api/animals/:id', upload.single('profile_photo'), async (req, res) => {
    const id = req.params.id;

    const {
        name,
        species,
        gender,
        breed,
        age_months,
        color_markings,
        behavior_traits,
        current_status,
        rescue_date,
        rescue_area,
        rescue_story,
        medical_history
    } = req.body;

    const profile_photo = req.file ? req.file.filename : null;

    try {
        // UPDATE ANIMAL
        await db.promise().query(`
            UPDATE animals SET
                name=?,
                species=?,
                gender=?,
                breed=?,
                age_months=?,
                color_markings=?,
                behavior_traits=?,
                current_status=?,
                rescue_date=?,
                rescue_area=?,
                rescue_story=?,
                profile_photo=COALESCE(?, profile_photo)
            WHERE animal_id=?
        `, [
            name, species, gender, breed,
            age_months, color_markings,
            behavior_traits, current_status,
            rescue_date, rescue_area,
            rescue_story,
            profile_photo,
            id
        ]);

        // DELETE OLD MEDICAL
        await db.promise().query(`DELETE FROM animal_medical_history WHERE animal_id=?`, [id]);

        // INSERT NEW MEDICAL
        const medList = JSON.parse(medical_history || '[]');

        for (const m of medList) {
            await db.promise().query(`
                INSERT INTO animal_medical_history 
                (animal_id, treatment_name, date_administered, administered_by)
                VALUES (?, ?, ?, ?)
            `, [id, m.treatment, m.date, m.by]);
        }

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

// DELETE /api/animals/:id - Delete animal and related medical history
app.delete('/api/animals/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await db.promise().query(`DELETE FROM animal_medical_history WHERE animal_id = ?`, [id]);
        const [result] = await db.promise().query(`DELETE FROM animals WHERE animal_id = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Animal record not found' });
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete animal record' });
    }
});

// POST /api/animals - Add new animal
app.post('/api/animals', upload.single('profile_photo'), async (req, res) => {
    const {
        name,
        species,
        gender,
        breed,
        age_months,
        color_markings,
        behavior_traits,
        current_status,
        rescue_date,
        rescue_area,
        rescue_story,
        medical_history
    } = req.body;

    const profile_photo = req.file ? req.file.filename : null;

    try {
        // INSERT ANIMAL
        const [result] = await db.promise().query(`
            INSERT INTO animals 
            (name, species, gender, breed, age_months, color_markings, behavior_traits, current_status, rescue_date, rescue_area, rescue_story, profile_photo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            name, species, gender, breed,
            age_months, color_markings,
            behavior_traits, current_status,
            rescue_date, rescue_area,
            rescue_story,
            profile_photo
        ]);

        const animalId = result.insertId;

        // INSERT MEDICAL HISTORY
        const medList = JSON.parse(medical_history || '[]');

        for (const m of medList) {
            await db.promise().query(`
                INSERT INTO animal_medical_history 
                (animal_id, treatment_name, date_administered, administered_by)
                VALUES (?, ?, ?, ?)
            `, [animalId, m.treatment, m.date, m.by]);
        }

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});
// POST ANNOUNCEMENT
app.post("/api/announcements", (req, res) => {
    const {
        event_title,
        venue_place,
        event_date,
        event_time,
        category,
        target_audience,
        is_urgent,
        pin_to_dashboard,
        send_push_notification,
        message_content
    } = req.body;

    const sql = `
        INSERT INTO announcements 
        (event_title, venue_place, event_date, event_time, category, target_audience, is_urgent, pin_to_dashboard, send_push_notification, message_content)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        event_title,
        venue_place,
        event_date,
        event_time,
        category,
        target_audience,
        is_urgent,
        pin_to_dashboard,
        send_push_notification,
        message_content
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Announcement saved!" });
    });
});

// GET ALL ANNOUNCEMENTS
app.get("/api/announcements", (req, res) => {
    const sql = "SELECT * FROM announcements ORDER BY id DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});
// UPDATE ANNOUNCEMENT
app.put("/api/announcements/:id", (req, res) => {
    const id = req.params.id;
    const {
        event_title,
        venue_place,
        event_date,
        event_time,
        category,
        target_audience,
        message_content
    } = req.body;
    const sql = `UPDATE announcements SET event_title=?, venue_place=?, event_date=?, event_time=?, category=?, target_audience=?, message_content=? WHERE id=?`;
    db.query(sql, [event_title, venue_place, event_date, event_time, category, target_audience, message_content, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Announcement updated!" });
    });
});

// DELETE ANNOUNCEMENT
app.delete("/api/announcements/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM announcements WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Announcement deleted!" });
    });
});
// API: Get total verified donations for admin dashboard
app.get('/api/admin/total-verified-donations', (req, res) => {
    const sql = "SELECT SUM(amount) AS total FROM donations WHERE status = 'Verified'";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ total: results[0].total || 0 });
    });
});

//for notification
app.get('/api/notifications', (req, res) => {
    if (!req.session.userId) return res.json({ success: false });

    // Kunin ang notifications na para sa kanya (NULL sa user_id means pang-lahat/announcement)
    const sql = `
        SELECT * FROM notifications 
        WHERE user_id = ? OR user_id IS NULL 
        ORDER BY created_at DESC LIMIT 10`;
        
    db.query(sql, [req.session.userId], (err, results) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true, notifications: results });
    });
});

// Route para i-mark as read ang notifications
app.post('/api/notifications/mark-read', (req, res) => {
    if (!req.session.userId) return res.json({ success: false });

    // UPDATE: Gawing status = 'Read' lahat ng notifications ng user na ito
    // Note: Siguraduhin na may 'status' column ang table mo o kaya ay i-delete na lang sila
    const sql = "UPDATE notifications SET is_read = 1 WHERE user_id = ? OR user_id IS NULL";
    
    db.query(sql, [req.session.userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

app.get('/notifications-ui', (req, res) => {
    // Siguraduhin na tama ang path papunta sa notifications.html mo
    res.sendFile(path.join(__dirname, 'public/user/notifications.html'));
});

app.use((req, res) => {
    console.warn(`[404] Resource not found: ${req.url}`);
    res.status(404).send(`
        <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Return to Home</a>
        </div>
    `);
});

//  Global Error Handler - Catches code crashes or file read errors 
app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    res.status(500).send(`
        <div style="text-align: center; margin-top: 50px; font-family: sans-serif; color: red;">
            <h1>Something went wrong!</h1>
            <p>The system encountered an internal error. Please try again later.</p>
        </div>
    `);
});


// 6. START SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});