const asyncHandler = require("express-async-handler");
const EmotionEntry = require("../models/emotionEntryModel");
const mongoose = require("mongoose");

//@desc Fetch all emotion entries
//@route GET /api/emotionEntries
//@access Private
const getEmotionEntries = asyncHandler(async (req, res) => {
  const emotionEntries = await EmotionEntry.find()
    .populate("user_id", "-password")
    .populate("emotion_id")
    .populate("activity_id");
  res.status(200).json(emotionEntries);
});

//@desc Fetch a single emotion entry
//@route GET /api/emotionEntries/:id
//@access Private
const getEmotionEntryById = asyncHandler(async (req, res) => {
  const emotionEntry = await EmotionEntry.findById(req.params.id)
    .populate("user_id", "-password")
    .populate("emotion_id")
    .populate("activity_id");
  if (emotionEntry) {
    res.status(200).json(emotionEntry);
  } else {
    res.status(404);
    throw new Error("Emotion entry not found");
  }
});

//@desc Create a new emotion entry
//@route POST /api/emotionEntries
//@access Public
const createEmotionEntry = asyncHandler(async (req, res) => {
  const { emotion_id, activity_id, description, voiceMessage } = req.body;

  const emotionEntry = await EmotionEntry.create({
    user_id: req.user.id,
    emotion_id,
    activity_id,
    description,
    voiceMessage,
  });

  res.status(201).json(emotionEntry);
});

//@desc Delete an emotion entry
//@route DELETE /api/emotionEntries/:id
//@access Private
const deleteEmotionEntry = asyncHandler(async (req, res) => {
  const emotionEntry = await EmotionEntry.findById(req.params.id);

  if (!emotionEntry) {
    res.status(404);
    throw new Error("Emotion entry not found");
  }

  await emotionEntry.deleteOne();
  res.status(204).json({ message: "Emotion entry removed" });
});

//@desc Delete all emotion entries
//@route DELETE /api/emotionEntries
//@access Private
const deleteAllEmotionEntries = asyncHandler(async (req, res) => {
  const result = await EmotionEntry.deleteMany({});

  if (result.deletedCount === 0) {
    res.status(404);
    throw new Error("No emotion entries found to delete");
  }

  res.status(204).json({ message: "All emotion entries removed" });
});

module.exports = {
  getEmotionEntries,
  getEmotionEntryById,
  createEmotionEntry,
  deleteEmotionEntry,
  deleteAllEmotionEntries,
};
