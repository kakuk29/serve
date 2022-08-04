var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema for User
var UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

exports.User = mongoose.model('User', UserSchema);
