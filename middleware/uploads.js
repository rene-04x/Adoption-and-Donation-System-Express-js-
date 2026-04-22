const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = './public/uploads/receipts/';
        
        // Paghihiwalay ng folders base sa fieldname
        if (file.fieldname === 'proofMismatch') {
            folder = './public/uploads/rejections/';
        } else if (file.fieldname === 'profilePic') {
            // Dito mapupunta ang mga admin profile pictures
            folder = './public/uploads/profile_pics/';
        }

        // Auto-create folder kung wala pa
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        // Para sa profile pic, ginagawa nating "profile-11-timestamp" para madaling ma-identify
        if (file.fieldname === 'profilePic') {
            cb(null, 'profile-11-' + Date.now() + path.extname(file.originalname));
        } else {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    }
});

const upload = multer({ storage: storage });
module.exports = upload;