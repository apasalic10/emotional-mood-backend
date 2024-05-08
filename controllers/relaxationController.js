const asyncHandler = require("express-async-handler");
const Relaxation = require("../models/relaxationModel");

//@desc Fetch all relaxations
//@route GET /api/relaxations
//@access Private
const getRelaxations = asyncHandler(async (req, res) => {
  const relaxations = await Relaxation.find();
  res.status(200).json(relaxations);
});

//@desc Fetch a single relaxation
//@route GET /api/relaxations/:id
//@access Private
const getRelaxationById = asyncHandler(async (req, res) => {
  const relaxation = await Relaxation.findById(req.params.id);
  if (relaxation) {
    res.status(200).json(relaxation);
  } else {
    res.status(404);
    throw new Error("Relaxation not found");
  }
});

//@desc Create a new relaxation
//@route POST /api/relaxations
//@access Private
const createRelaxation = asyncHandler(async (req, res) => {
  const { title, description, url } = req.body;

  const relaxation = await Relaxation.create({
    title,
    description,
    url,
  });

  res.status(201).json(relaxation);
});

//@desc Delete a relaxation
//@route DELETE /api/relaxations/:id
//@access Private
const deleteRelaxation = asyncHandler(async (req, res) => {
  const relaxation = await Relaxation.findById(req.params.id);

  if (!relaxation) {
    res.status(404);
    throw new Error("Relaxation not found");
  }

  await relaxation.deleteOne();
  res.status(204).json({ message: "Relaxation removed" });
});

//@desc Update a relaxation
//@route PUT /api/relaxations/:id
//@access Private
const updateRelaxation = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;

  const relaxation = await Relaxation.findById(req.params.id);

  if (!relaxation) {
    res.status(404);
    throw new Error("Relaxation not found");
  }

  if (name) relaxation.name = name;
  if (description) relaxation.description = description;
  if (imageUrl) relaxation.imageUrl = imageUrl;

  const updatedRelaxation = await relaxation.save();

  res.status(200).json(updatedRelaxation);
});

module.exports = {
  getRelaxations,
  getRelaxationById,
  createRelaxation,
  deleteRelaxation,
  updateRelaxation,
};
