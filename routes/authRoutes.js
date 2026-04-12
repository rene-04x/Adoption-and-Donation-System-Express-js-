const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../Database/db'); 

// --- LOGIN ROUTES ---
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/user-login.html'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        
        if (rows.length === 0) {
            return res.status(401).send("<script>alert('User not found!'); window.history.back();</script>");
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // 1. I-set ang Session data
            req.session.userId = user.id;
            req.session.username = user.username;
            
            // 2. I-save ang session bago mag-send ng response
            req.session.save((err) => {
                if (err) {
                    console.error("Session Save Error:", err);
                    return res.status(500).send("Login failed due to session error.");
                }

                // Determine redirect path: admin goes to '/', others to '/dashboard'
                const redirectPath = user.username === 'admin' ? '/admin/admin_dashboard' : '/dashboard';

                // 3. I-send ang Styled Message
                return res.status(200).send(`
                    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                    <script>
                        window.onload = function() {
                            Swal.fire({
                                title: 'Login Successful!',
                                text: 'Welcome back, ${user.username}!',
                                icon: 'success',
                                confirmButtonColor: '#ff8c00',
                                confirmButtonText: 'Proceed'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.href = '${redirectPath}';
                                }
                            });
                        };
                    </script>
                `);
            });

        } else {
            return res.send("<script>alert('Wrong password!'); window.history.back();</script>");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Login error");
    }
});

// --- REGISTER ROUTES ---
router.get('/user-signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/user-signup.html'));
});

// Sign-up Route
router.post('/register', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.send("Passwords do not match!");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        
        await db.query(sql, [username, email, hashedPassword]);
        res.redirect('/login?status=registered');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving user.");
    }
});

// --- OTHER AUTH FORMS ---
router.get('/org-register', (req, res) => res.sendFile(path.join(__dirname, '../public/login/org-register.html')));
router.get('/form2', (req, res) => res.sendFile(path.join(__dirname, '../public/login/form2.html')));
router.get('/form3', (req, res) => res.sendFile(path.join(__dirname, '../public/login/form3.html')));

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("Error logging out");
        res.clearCookie('connect.sid'); // Linisin ang session cookie sa browser
        res.redirect('/login?msg=logged_out');
    });
});

module.exports = router;