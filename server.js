const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');

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
        a.gender,
        a.breed,
        a.age_months AS age,
        a.color_markings AS color,
        a.behavior_traits AS traits,
        a.current_status AS status,
        a.rescue_area AS rescue_location,
        a.rescue_date,
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
app.put('/api/animals/:id', (req, res) => {
    const id = req.params.id;

    const {
        name,
        gender,
        breed,
        age,
        color,
        traits,
        status,
        rescue_location,
        rescue_date
    } = req.body;

    const query = `
        UPDATE animals SET
            name = ?,
            gender = ?,
            breed = ?,
            age_months = ?,
            color_markings = ?,
            behavior_traits = ?,
            current_status = ?,
            rescue_area = ?,
            rescue_date = ?
        WHERE animal_id = ?
    `;

    db.query(query, [
        name,
        gender,
        breed,
        age || null,
        color,
        traits,
        status,
        rescue_location,
        rescue_date || null,
        id
    ], (err, result) => {
        if (err) {
            console.error("Update error:", err);
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Animal updated successfully" });
    });
});

//  404 Handler - Catches any request that doesn't match a route
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