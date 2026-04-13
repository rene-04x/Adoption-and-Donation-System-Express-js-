const express = require('express');
const app = express();
const path = require('path');


// IMPORTANTE: Ito ang mag-parse ng incoming JSON requests
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// 1. IMPORT ROUTES
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// 2. IMPORT MIDDLEWARES
const logger = require('./middleware/logger');
const { isAdmin } = require('./middleware/auth');

//to use session
const session = require('express-session');

// Sa server.js, i-update ang session part:
app.use(session({
    secret: 'PAWSsion_Safe_Key_2026_@dm1n',
    resave: true, // Gawing true muna
    saveUninitialized: true, // Gawing true muna
    cookie: { 
        secure: false, // Dahil naka-http (localhost) ka lang
        maxAge: 3600000 
    }
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