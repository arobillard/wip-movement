const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  region: 'us-east-1'
});

const s3 = new aws.S3();

const adminUploadVideo = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'works-in-progress-bucket/videos',
    acl: 'public-read',
    contentType: (req, file, cb) => {
      console.log('here');
      cb(null, file.mimetype)
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      console.log(file)
      let newKey = file.originalname.replace(' ', '');
      cb(null, newKey);
    }
  })
});

const adminUploadScreenshot = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'works-in-progress-bucket/screenshots',
    acl: 'public-read',
    contentType: (req, file, cb) => {
      console.log('here');
      cb(null, file.mimetype)
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      console.log(file)
      let newKey = file.originalname.replace(' ', '');
      cb(null, newKey);
    }
  })
});

module.exports = {
  adminUploadVideo,
  adminUploadScreenshot
}