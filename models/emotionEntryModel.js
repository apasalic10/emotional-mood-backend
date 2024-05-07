const mongoose = require("mongoose");

const emotionEntrySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emotion_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Emotion",
      required: true,
    },
    activity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
    description: {
      type: String,
    },
    voiceMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmotionEntry", emotionEntrySchema);
