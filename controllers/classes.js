let classes = [{ name: 'first class' }, { name: 'second class' }, { name: 'pilates 2' }, { name: 'pilates 32' }, { name: 'Something' }, { name: 'Tim is Awesome' }, { name: 'Woot Woot' }]
classes = classes.map((c, i) => ({ ...c, id: 'al912lkf8' + i }))

const getAutoComplete = async (req, res) => {
  res.json({ classes })
}

const getOne = async (req, res) => {
  let resp = classes.find(x => x.id === req.params.id);
  res.json({ class: resp });
}

module.exports = {
  getAutoComplete,
  getOne
}

