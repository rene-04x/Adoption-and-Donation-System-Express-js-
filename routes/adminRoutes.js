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
router.get('/donations', adminController.getDonations);
router.get('/analytics', adminController.getAnalytics);
router.get('/monitoring', adminController.getMonitoring);
router.get('/organizations', adminController.getOrganizations);
router.get('/announcements', adminController.getAnnouncements);


router.get('/api/adoptions', adminController.getAllAdoptions); 
router.get('/api/adoptions/:id', adminController.getAdoptionDetails); 

router.put('/api/adoptions/:id/status', adminController.updateAdoptionStatus);
router.put('/api/adoptions/:id/schedule', adminController.scheduleInterview);
router.get('/adoption-stats', adminController.getAdoptionStats);

router.get('/recent-donations', adminController.getRecentDonations);
router.get('/monthly-adoptions', adminController.getMonthlyAdoptionStats);

router.get('/monthly-donations', adminController.getMonthlyDonationStats);
// adminRoutes.js
// route
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/user-login.html?status=success');
    });
});

module.exports = router;

