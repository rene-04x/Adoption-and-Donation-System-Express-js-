const mysql = require('mysql2');

// Gamitin ang settings mula sa .env file mo
const connection = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'adoption_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// I-export para magamit sa app.js
module.exports = connection.promise();