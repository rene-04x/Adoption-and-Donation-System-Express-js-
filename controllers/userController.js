const fs = require('fs');
const path = require('path');

const renderUserPage = (req, res, fileName, errorMsg) => {
    const username = req.query.username || 'User';
    const filePath = path.join(__dirname, '../public/user', fileName);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(errorMsg);
        res.send(data.replace(/{{username}}/g, username));
    });
};

exports.getDashboard = (req, res) => renderUserPage(req, res, 'dashboard.html', "Error loading Dashboard");
exports.getProfile = (req, res) => renderUserPage(req, res, 'profile.html', "Error loading Profile");
exports.getDonations = (req, res) => renderUserPage(req, res, 'donations.html', "Error loading Donations");
exports.getApplication = (req, res) => renderUserPage(req, res, 'application.html', "Error loading Application");
exports.getKamustahan = (req, res) => renderUserPage(req, res, 'kamustahan.html', "Error loading Kamustahan");