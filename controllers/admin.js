const Prerecorded = require('../models/Prerecorded');
const User = require('../models/User');

const { adminUploadVideo, adminUploadScreenshot } = require('./upload');

const singleUploadClass = adminUploadVideo.single('file');
const singleUpladScreenShot = adminUploadScreenshot.single('file');

const getAllClasses = async (req, res) => {
  try {
    let dances = await Prerecorded.find({ type: 'D' });
    let collabs = await Prerecorded.find({ type: 'C' });
    let pillates = await Prerecorded.find({ type: 'P' });
    let movements = await Prerecorded.find({ type: 'M' });
    res.json({ dances, collabs, pillates, movements });
  } catch (err) {
    res.status(500).json(err);
  }
}

const getOneClass = async (req, res) => {
  try {
    let thisClass = await Prerecorded.findById(req.params.id).populate({ path: 'comments', populate: { path: 'user' } }).lean();
    let students = await User.find({ myClasses: req.params.id });
    thisClass.enrolled = students;
    res.json({ thisClass })
  } catch (err) {
    res.status(500).json(err);
  }
}

const uploadClassToAmazon = async (req, res) => {
  try {
    await singleUploadClass(req, res, (err) => {
      if (err) {
        res.status(500).json(err);
      }
      return req.file ? res.json({ 'videoUrl': req.file.location }) : res.json({ err: 'File not uploaded properly..' });
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

const uploadScreenshotToAmazon = async (req, res) => {
  try {
    await singleUpladScreenShot(req, res, (err) => {
      if (err) {
        res.status(500).json(err);
      }
      return req.file ? res.json({ 'screenshotUrl': req.file.location }) : res.json({ err: 'File not uploaded properly..' });
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getAllClasses,
  getOneClass,
  uploadClassToAmazon,
  uploadScreenshotToAmazon
}


