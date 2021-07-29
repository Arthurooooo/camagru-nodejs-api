const multer = require('multer');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
  });

module.exports = multer({storage: storage}).single('image');

