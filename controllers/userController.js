const fs = require('fs');
const path = require('path');

const renderUserPage = (req, res, fileName, errorMsg) => {
    if (!req.session.userId) {
        return res.redirect('/login?error=unauthorized');
    }

    // 2. Kunin ang username mula sa SESSION (hindi sa query string para mas secure)
    const username = req.session.username || 'User';
    const filePath = path.join(__dirname, '../public/user', fileName);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(errorMsg);
        // Palitan ang {{username}} sa HTML mo ng totoong pangalan mula sa session
        res.send(data.replace(/{{username}}/g, username));
    });
};

exports.getDashboard = (req, res) => renderUserPage(req, res, 'dashboard.html', "Error loading Dashboard");
exports.getProfile = (req, res) => renderUserPage(req, res, 'profile.html', "Error loading Profile");
exports.getDonations = (req, res) => renderUserPage(req, res, 'donations.html', "Error loading Donations");
exports.getApplication = (req, res) => renderUserPage(req, res, 'application.html', "Error loading Application");
exports.getKamustahan = (req, res) => renderUserPage(req, res, 'kamustahan.html', "Error loading Kamustahan");