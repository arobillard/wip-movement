const mongoose = require('mongoose');
const Prerecorded = require('../models/Prerecorded');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { populate } = require('../models/Prerecorded');

let classes = [{ name: 'first class' }, { name: 'second class' }, { name: 'pilates 2' }, { name: 'pilates 32' }, { name: 'Something' }, { name: 'Tim is Awesome' }, { name: 'Woot Woot' }]
classes = classes.map((c, i) => ({ ...c, id: 'al912lkf8' + i }))

const getAll = async (req, res) => {
  try {
    let resp = await Prerecorded.find({});
    res.json({ classes: resp });
  } catch (err) {
    res.status(500).json({ classes: [], err: 'Couldn\'t find and classes..' });
  }
}

const getOne = async (req, res) => {
  try {
    let resp = await Prerecorded.findById(req.params.id).populate({ path: 'comments', model: 'Comment', populate: { path: 'user', model: 'User' } });
    res.json({ class: resp });
  } catch (err) {
    res.status(500).json({ classes: [], err: 'Couldn\'t find that class..' })
  }
}

const getSearch = async (req, res) => {
  try {
    let query = req.params.search;
    let resp = await Prerecorded.find({ $or: [{ name: { $regex: `${query}`, $options: 'i' } }, { tags: { $elemMatch: { $regex: `${query}`, $options: 'i' } } }] });
    res.json({ classes: resp })
  } catch (err) {
    res.status(500).json({ classed: [], err: 'Couldn\'t find any classes..' })
  }
}

const getFeatured = async (req, res) => {
  try {
    let resp = await Prerecorded.findOne({ featured: true });
    if (!resp) return res.status(500).json({ featured: [], err: 'No Featured Class Found..' })
    res.json({ featured: resp })
  } catch (err) {
    res.status(500).json({ featured: [], err: err.message })
  }
}

const getRandom = async (req, res) => {
  try {
    let resp = await Prerecorded.find({ type: { $ne: 'C' } });
    let classes = [];
    let used = [];
    for (let i = 0; i < req.params.num; i++) {
      let ind = Math.floor(Math.random() * resp.length);
      while (used.includes(ind)) {
        ind = Math.floor(Math.random() * resp.length);
      }
      used.push(ind);
      classes.push(resp[ind]);
    }
    res.json({ classes })
  } catch (err) {
    res.status(500).json({ classes: [], err: err.message })
  }
}

const getSimilar = async (req, res) => {
  try {
    let oldClass = await Prerecorded.findById(req.params.id);
    let index = 1
    let newClasses = await Prerecorded.find({ _id: { $ne: req.params.id }, tags: oldClass.tags[0] });
    let ids = newClasses.map(c => JSON.stringify(c._id));
    let extraClasses = []
    while (index < oldClass.tags.length && newClasses.length < req.params.num) {
      extraClasses = await Prerecorded.find({ _id: { $ne: req.params.id }, tags: { $in: oldClass.tags[index] } });
      extraClasses.forEach(c => {
        if (ids.includes(JSON.stringify(c._id))) {
        } else {
          ids.push(JSON.stringify(c._id));
          newClasses.push(c);
        }
      })
      index++;
    }
    res.json({ classes: newClasses.slice(0, req.params.num) })
  } catch (err) {
    res.status(500).json({ classes: [], err: err.message });
  }
}

const getSaves = async (req, res) => {
  try {
    let saves = await User.find({ myClasses: { $in: req.params.id } });
    res.json({ saves: saves.length })
  } catch (err) {
    res.status(500).json({ saves: [], err: err.message })
  }
}

const getUserClasses = async (req, res) => {
  try {
    let classList = await Prerecorded.find({ _id: { $in: req.body.list } });
    if (classList.length < 1) res.status(404).json({ classes: [] });
    res.json({ classes: classList });
  } catch (err) {
    res.status(500).json({ classes: {}, err: 'Couldn\'t create class..' });
  }
}

const addOne = async (req, res) => {
  try {
    let newClass = new Prerecorded(req.body);
    let resp = await newClass.save();
    res.json({ class: resp });
  } catch (err) {
    res.status(500).json({ class: {}, err: err.message });
  }
}

const writeComment = async (req, res) => {
  try {
    let cls = await Prerecorded.findById(req.params.id);
    let comment = new Comment(req.body);
    let SavedComment = await comment.save();
    cls.comments.push(SavedComment._id);
    let saved = await cls.save()
    let popped = await saved.populate({ path: 'comments', model: 'Comment', populate: { path: 'user', model: 'User' } });
    res.json({ class: popped });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

const deleteOne = async (req, res) => {
  try {
    console.log('hello')
    let resp = await Prerecorded.findOneAndDelete({ _id: req.params.id });
    res.json({ deleted: resp });
  } catch (err) {
    res.status(500).json(err);
  }
}


module.exports = {
  getAll,
  getOne,
  getSearch,
  getFeatured,
  getRandom,
  getSimilar,
  getSaves,
  getUserClasses,
  addOne,
  writeComment,
  deleteOne
}

