const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const createJWT = user => {
  return jwt.sign({ user }, SECRET);
}

const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    let newUser = await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ err: 'Email taken..' });
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) return res.status(404).json({ err: { message: 'Email not found..' } });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        res.status(401).json({ err: 'Incorrect Password..' })
      }
    })
  } catch (err) {
    return res.status(500).json(err);
  }
}

const saveClass = async (req, res) => {
  try {
    let userModel = await User.findById(req.body.userId);
    if (!userModel.myClasses.includes(req.body.classId)) userModel.myClasses.push(req.body.classId);
    let saved = await userModel.save();
    let token = createJWT(saved);
    res.json({ token })
  } catch (err) {
    res.status(500).json(err);
  }
}

const unSaveClass = async (req, res) => {
  try {
    let userModel = await User.findById(req.body.userId);
    console.log(userModel.myClasses);
    userModel.myClasses.pull(req.body.classId)
    console.log(userModel.myClasses);

    let newUser = await userModel.save();
    let token = createJWT(newUser);
    res.json({ token, newUser })
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  signup,
  login,
  saveClass,
  unSaveClass,
}