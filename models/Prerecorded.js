const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  type: {
    type: String,
    enum: ['C', 'D', 'M'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: Schema.Types.Date,
  video: String,
  instructor: {
    type: String,
    default: 'Caitlin Elmslie'
  },
  enrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  icon: {
    type: Number,
    default: 1
  },
  tags: [String]
}, {
  timestamps: true
})

module.exports = mongoose.model('Prerecorded', classSchema);