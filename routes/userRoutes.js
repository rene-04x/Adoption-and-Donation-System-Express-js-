const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { isAuthenticated } = require('../middleware/auth');
const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');
const db = require('../Database/db'); // I-import ang connection natin

router.get('/api/user', (req, res) => {
    if (req.session && req.session.username) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false, username: 'Guest' }); // Hindi na siya error, empty data lang
    }
});

router.get('/dashboard', isAuthenticated, userController.getDashboard);
router.get('/profile', isAuthenticated, userController.getProfile);
router.get('/donations', isAuthenticated, userController.getDonations);
router.get('/application', isAuthenticated, userController.getApplication);
router.get('/kamustahan', userController.getKamustahan);

// User-specific Hubs
router.get('/adoption_hub', (req, res) => res.sendFile(path.join(__dirname, '../public/user/adoption_hub.html')));
router.get('/sidebar', (req, res) => res.sendFile(path.join(__dirname, '../public/user/sidebar.html')));

// Landing Page Pages
router.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../public/landing_page/about.html')));
router.get('/donate', (req, res) => res.sendFile(path.join(__dirname, '../public/landing_page/donate.html')));

// Legal and Support
router.get('/policy', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/policy.html')));
router.get('/terms', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/terms.html')));
router.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/contact.html')));
router.get('/faqs', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/faqs.html')));

module.exports = router;