
const path = require('path');

// Helper para sa pagpapadala ng admin files
const sendAdminFile = (req, res, fileName) => {
    res.sendFile(path.join(__dirname, '../public/admin', fileName));
};

exports.getHome = (req, res) => sendAdminFile(req, res, 'home.html');
exports.getAnimals = (req, res) => sendAdminFile(req, res, 'animals.html');
exports.getAdoptions = (req, res) => sendAdminFile(req, res, 'adoptions.html');
exports.getDonations = (req, res) => sendAdminFile(req, res, 'donation.html');
exports.getAnalytics = (req, res) => sendAdminFile(req, res, 'analytics.html');
exports.getMonitoring = (req, res) => sendAdminFile(req, res, 'monitoring.html');
exports.getOrganizations = (req, res) => sendAdminFile(req, res, 'organizations.html');
exports.getAnnouncements = (req, res) => sendAdminFile(req, res, 'announcement.html');