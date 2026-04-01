// middleware/auth.js

const isAdmin = (req, res, next) => {
    console.log("Admin access granted.");
    next(); 
};

module.exports = { isAdmin };