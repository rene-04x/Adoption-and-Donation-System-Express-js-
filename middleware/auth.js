const isAdmin = (req, res, next) => {
    console.log("Admin access granted.");
    next(); 
};


const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.username) {
        return next();
    }
    // IMBS NA res.json, DAPAT REDIRECT:
    res.redirect('/login?error=unauthorized'); 
};

module.exports = { isAdmin, isAuthenticated };