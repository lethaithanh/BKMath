const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Teacher', 'Student'],
      default: 'Student',
    },
    avatar: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema);
