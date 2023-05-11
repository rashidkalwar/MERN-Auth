const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: 'string',
      required: [true, 'Please provide an Email Address'],
      unique: [true, 'Email already exists'],
    },

    password: {
      type: 'string',
      required: [true, 'Please provide a Password'],
      unique: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model.Users || mongoose.model('Users', userSchema);
