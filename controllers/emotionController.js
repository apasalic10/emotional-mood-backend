const asyncHandler = require("express-async-handler");
const Emotion = require("../models/emotionModel");

//@desc Fetch all emotions
//@route GET /api/emotions
//@access Private
const getEmotions = asyncHandler(async (req, res) => {
  const emotions = await Emotion.findAll();
  res.status(200).json(emotions);
});

//@desc Fetch a single emotion
//@route GET /api/emotions/:id
//@access Private
const getEmotionById = asyncHandler(async (req, res) => {
  const emotion = await Emotion.findByPk(req.params.id);
  if (emotion) {
    res.status(200).json(emotion);
  } else {
    res.status(404);
    throw new Error("Emotion not found");
  }
});

//@desc Create a new emotion
//@route POST /api/emotions
//@access Private
const createEmotion = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;

  const emotion = await Emotion.create({
    name,
    description,
    imageUrl,
  });

  res.status(201).json(emotion);
});

//@desc Delete an emotion
//@route DELETE /api/emotions/:id
//@access Private
const deleteEmotion = asyncHandler(async (req, res) => {
  const emotion = await Emotion.findByPk(req.params.id);

  if (!emotion) {
    res.status(404);
    throw new Error("Emotion not found");
  }

  await emotion.destroy();
  res.status(204).json({ message: "Emotion removed" });
});

//@desc Update an emotion
//@route PUT /api/emotions/:id
//@access Private
const updateEmotion = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;

  const emotion = await Emotion.findByPk(req.params.id);

  if (!emotion) {
    res.status(404);
    throw new Error("Emotion not found");
  }

  if (name) emotion.name = name;
  if (description) emotion.description = description;
  if (imageUrl) emotion.imageUrl = imageUrl;

  const updatedEmotion = await emotion.save();

  res.status(200).json(updatedEmotion);
});

module.exports = { getEmotions, getEmotionById, createEmotion, deleteEmotion };
