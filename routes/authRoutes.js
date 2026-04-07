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

// router.post('/login', (req, res) => {
//     const username = req.body.username || 'User';
//     // redirect sa home na nasa user routes
//     res.redirect('/dashboard?username=' + encodeURIComponent(username));
// });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        
        if (rows.length === 0) {
            return res.send("<script>alert('User not found!'); window.history.back();</script>");
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // 1. I-set ang Session
            req.session.userId = user.id;
            req.session.username = user.username;
            
            // 2. I-send ang Styled Message bago mag-redirect
            return res.send(`
                <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                <script>
                    window.onload = function() {
                        Swal.fire({
                            title: 'Login Successful!',
                            text: 'Welcome back, ${user.username}!',
                            icon: 'success',
                            confirmButtonColor: '#ff8c00',
                            confirmButtonText: 'Proceed to Dashboard'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/dashboard';
                            }
                        });
                    };
                </script>
            `);
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
router.post('/logout', (req, res) => {
    // If you are using express-session:
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send("Could not log out.");
            }
            res.clearCookie('connect.sid'); // clear the session cookie
            return res.sendStatus(200);
        });
    } else {
        // If you are using JWT, usually you just tell the client to delete the token
        res.sendStatus(200);
    }
});
module.exports = router;