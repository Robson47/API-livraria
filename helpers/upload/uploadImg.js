const multer = require('multer');

const storage = multer.memoryStorage(); // Você pode alterar isso para o armazenamento desejado
const fileFilter = (req, file, cb) => {
    // Adicione sua lógica de filtragem aqui
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB (ajuste conforme necessário)
    },
    fileFilter: fileFilter,
});

module.exports = upload;