// middleware/logger.js
const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
    next(); // Kailangan ito para tumuloy ang request
};

module.exports = logger;