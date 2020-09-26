const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNTS = 6;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  password: String
}, {
  timestamps: true
})