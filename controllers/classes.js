const Prerecorded = require('../models/Prerecorded');

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
    let resp = await Prerecorded.findById(req.params.id);
    res.json({ class: resp });
  } catch (err) {
    res.status(500).json({ classes: [], err: 'Couldn\'t find that class..' })
  }
}

const getSearch = async (req, res) => {
  try {
    let query = req.params.search;
    console.log(query);
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
    let resp = await Prerecorded.find({});
    let classes = [];
    let used = [];
    for (let i = 0; i < 4; i++) {
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

const addOne = async (req, res) => {
  try {
    let newClass = new Prerecorded(req.body);
    let resp = await newClass.save();
    res.json({ class: resp });
  } catch (err) {
    res.status(500).json({ class: {}, err: 'Couldn\'t create class..' });
  }
}

module.exports = {
  getAll,
  getOne,
  getSearch,
  getFeatured,
  getRandom,
  addOne,
}

