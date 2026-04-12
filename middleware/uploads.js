const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Titingnan natin kung ang request ay galing sa rejection route
        // Kung ang fieldname ay 'proofMismatch', sa rejections folder siya pupunta
        let folder = './public/uploads/receipts/';
        
        if (file.fieldname === 'proofMismatch') {
            folder = './public/uploads/rejections/';
        }

        // Siguraduhin nating exist ang folder para hindi mag-error ang multer
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, 'receipt-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
module.exports = upload;