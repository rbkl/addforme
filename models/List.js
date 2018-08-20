const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Profile Schema
const ListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
  },
  instructions: {
    type: String
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      order: {
        type: String,
      },
      notes: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = List = mongoose.model('list', ListSchema);
