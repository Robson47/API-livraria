const multer = require('multer');

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? cb(null, true) : cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // LIMITE DE 5MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;