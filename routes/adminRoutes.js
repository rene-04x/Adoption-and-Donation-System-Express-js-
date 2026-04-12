const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');
const upload = require('../middleware/uploads');

router.post('/reject-donation', upload.single('proofMismatch'), adminController.rejectDonation);
router.post('/verify-donation', adminController.verifyDonation);

// Route para sa table ng donations
router.get('/donations-data', adminController.getAllDonationsAPI);

// Route para sa table ng donations
router.get('/donations-data', adminController.getAllDonationsAPI);

router.get('/admin_dashboard', adminController.getHome); 
router.get('/animals', adminController.getAnimals);
router.get('/adoptions', adminController.getAdoptions);
router.get('/donations', adminController.getDonations);
router.get('/analytics', adminController.getAnalytics);
router.get('/monitoring', adminController.getMonitoring);
router.get('/organizations', adminController.getOrganizations);
router.get('/announcements', adminController.getAnnouncements);      

module.exports = router;