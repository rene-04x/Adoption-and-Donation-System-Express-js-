const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

router.get('/', adminController.getHome); 
router.get('/animals', adminController.getAnimals);
router.get('/adoptions', adminController.getAdoptions);
router.get('/donations', adminController.getDonations);
router.get('/analytics', adminController.getAnalytics);
router.get('/monitoring', adminController.getMonitoring);
router.get('/organizations', adminController.getOrganizations);
router.get('/announcements', adminController.getAnnouncements);      

module.exports = router;