const mongoose = require("mongoose");

const emotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    reaction: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Emotion", emotionSchema);
