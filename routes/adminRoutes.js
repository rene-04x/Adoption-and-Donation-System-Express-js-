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
router.get('/adoptions', adminController.getAdoptions); // Render the HTML page
router.get('/donations', adminController.getDonations);
router.get('/analytics', adminController.getAnalytics);
router.get('/monitoring', adminController.getMonitoring);
router.get('/organizations', adminController.getOrganizations);
router.get('/announcements', adminController.getAnnouncements);

// API Endpoints (Para sa AJAX/Fetch)
router.get('/api/adoptions', adminController.getAllAdoptions); // Kuhain lahat ng applications
router.get('/api/adoptions/:id', adminController.getAdoptionDetails); // Specific application details
// Idagdag ito sa API Endpoints section
router.put('/api/adoptions/:id/status', adminController.updateAdoptionStatus);
router.put('/api/adoptions/:id/schedule', adminController.scheduleInterview);

module.exports = router;

