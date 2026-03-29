const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const userController = require('../controllers/userController');

router.get('/dashboard', userController.getDashboard);
router.get('/profile', userController.getProfile);
router.get('/home', userController.getHome);
router.get('/donations', userController.getDonations);
router.get('/application', userController.getApplication);
router.get('/kamustahan', userController.getKamustahan);

// User-specific Hubs
router.get('/adoption_hub', (req, res) => res.sendFile(path.join(__dirname, '../public/user/adoption_hub.html')));
router.get('/sidebar', (req, res) => res.sendFile(path.join(__dirname, '../public/user/sidebar.html')));

// Landing Page Pages
router.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../public/landing_page/about.html')));
router.get('/donate', (req, res) => res.sendFile(path.join(__dirname, '../public/landing_page/donate.html')));
router.get('/how', (req, res) => res.sendFile(path.join(__dirname, '../public/landing_page/howItWorks.html')));

// Legal and Support
router.get('/policy', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/policy.html')));
router.get('/terms', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/terms.html')));
router.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/contact.html')));
router.get('/faqs', (req, res) => res.sendFile(path.join(__dirname, '../public/legal/faqs.html')));

module.exports = router;