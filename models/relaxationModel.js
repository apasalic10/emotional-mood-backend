const mongoose = require("mongoose");

const relaxationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Relaxation", relaxationSchema);
