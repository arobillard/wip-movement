const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  type: {
    type: String,
    enum: ['C', 'D', 'M', 'P'],
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
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  screenshot: {
    type: String,
    default: 'images/Test-Dancer.jpeg'
  },
  tags: [String],
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
})

module.exports = mongoose.model('Prerecorded', classSchema);