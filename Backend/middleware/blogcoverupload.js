const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, 'media'));
    },
    filename: (req, file, cb) => {
        // Ensure the filename is unique by using permalink and extension
        const permalink = req.body.permalink;
        const ext = path.extname(file.originalname);
        cb(null, `${permalink}${ext}`);
    }
});

// Filter files to accept only specific types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Only images with jpg, jpeg, or png format are allowed.'));
};

// Initialize multer with storage and file filter configuration
const upload = multer({ dest: '/tmp/uploads/' })

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
// });

module.exports = upload;
