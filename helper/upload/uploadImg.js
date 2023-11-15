const multer = require('multer'); 

const fileFilter = (req, file, cb) => {
    file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ? cb(null, true) : cb(null, false);
};

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter,
});

module.exports = upload;