const mongoose = require("mongoose");

const userShema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add the user first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please add the user last name"],
    },
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userShema);
