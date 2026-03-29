const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// --- LOGIN ROUTES ---
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/user-login.html'));
});

router.post('/login', (req, res) => {
    const username = req.body.username || 'User';
    // redirect sa home na nasa user routes
    res.redirect('/home?username=' + encodeURIComponent(username));
});

// --- REGISTER ROUTES ---
router.get('/user-signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/user-signup.html'));
});

router.post('/register', (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    const filePath = path.join(__dirname, '../public/login/user-signup.html');

    if (password !== confirm_password) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return res.status(500).send("Error loading signup page");
            const htmlWithError = data.replace('{{errorMessage}}', 'Password and Confirm Password do not match!');
            res.send(htmlWithError);
        });
    } else {
        res.redirect('/login');
    }
});

// --- OTHER AUTH FORMS ---
router.get('/org-register', (req, res) => res.sendFile(path.join(__dirname, '../public/login/org-register.html')));
router.get('/form2', (req, res) => res.sendFile(path.join(__dirname, '../public/login/form2.html')));
router.get('/form3', (req, res) => res.sendFile(path.join(__dirname, '../public/login/form3.html')));

module.exports = router;