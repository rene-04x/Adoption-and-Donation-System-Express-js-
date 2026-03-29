// middleware/auth.js

const isAdmin = (req, res, next) => {
    const userRole = req.query.role; 

    if (userRole === 'admin') {
        console.log("Admin access granted.");
        next(); 
    } else {
        console.log("Access denied. Not an admin.");
        res.status(403).send("<h1>403 Forbidden</h1><p>Wala kang permiso na i-access ang Admin Panel.</p>");
    }
};

module.exports = { isAdmin };