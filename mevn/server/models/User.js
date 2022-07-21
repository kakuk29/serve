const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  mail: {
    type: String,
  },
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
