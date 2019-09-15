const multer = require('multer');
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images/post-pictures')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '.jpg')
  }
})
var upload = multer({
  storage: storage
}).single('file')

module.exports = upload;