const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  upvotes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  private: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('build', BuildSchema);
