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
  addOne
}

