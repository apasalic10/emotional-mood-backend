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

emotionEntrySchema.pre("save", function (next) {
  if (this.emotion_id && typeof this.emotion_id === "string") {
    this.emotion_id = mongoose.Types.ObjectId(this.emotion_id);
  }
  if (this.activity_id && typeof this.activity_id === "string") {
    this.activity_id = mongoose.Types.ObjectId(this.activity_id);
  }
  next();
});

module.exports = mongoose.model("EmotionEntry", emotionEntrySchema);
