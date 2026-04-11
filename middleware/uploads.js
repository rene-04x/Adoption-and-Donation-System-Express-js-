const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/receipts/',
    filename: (req, file, cb) => {
        cb(null, 'receipt-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;