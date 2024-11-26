const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");

// Will be used to delete the file from local disk once uploaded to blob storage
const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Making filename unique by prefixing timestamp to filename
    },
});

module.exports = {
    upload: multer({ storage: storage }),
    unlinkAsync,
};
