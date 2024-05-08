const asyncHandler = require("express-async-handler");
const EducationMaterial = require("../models/educationalMaterialModel");

//@desc Fetch all education materials
//@route GET /api/educationMaterials
//@access Private
const getEducationMaterials = asyncHandler(async (req, res) => {
  const educationMaterials = await EducationMaterial.find();
  res.status(200).json(educationMaterials);
});

//@desc Fetch a single education material
//@route GET /api/educationMaterials/:id
//@access Private
const getEducationMaterialById = asyncHandler(async (req, res) => {
  const educationMaterial = await EducationMaterial.findById(req.params.id);
  if (educationMaterial) {
    res.status(200).json(educationMaterial);
  } else {
    res.status(404);
    throw new Error("Education material not found");
  }
});

//@desc Create a new education material
//@route POST /api/educationMaterials
//@access Private
const createEducationMaterial = asyncHandler(async (req, res) => {
  const { title, description, url } = req.body;

  const educationMaterial = await EducationMaterial.create({
    title,
    description,
    url,
  });

  res.status(201).json(educationMaterial);
});

//@desc Delete an education material
//@route DELETE /api/educationMaterials/:id
//@access Private
const deleteEducationMaterial = asyncHandler(async (req, res) => {
  const educationMaterial = await EducationMaterial.findById(req.params.id);

  if (!educationMaterial) {
    res.status(404);
    throw new Error("Education material not found");
  }

  await educationMaterial.deleteOne();
  res.status(204).json({ message: "Education material removed" });
});

//@desc Update an education material
//@route PUT /api/educationMaterials/:id
//@access Private
const updateEducationMaterial = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;

  const educationMaterial = await EducationMaterial.findById(req.params.id);

  if (!educationMaterial) {
    res.status(404);
    throw new Error("Education material not found");
  }

  if (name) educationMaterial.name = name;
  if (description) educationMaterial.description = description;
  if (imageUrl) educationMaterial.imageUrl = imageUrl;

  const updatedEducationMaterial = await educationMaterial.save();

  res.json(updatedEducationMaterial);
});

module.exports = {
  getEducationMaterials,
  getEducationMaterialById,
  createEducationMaterial,
  deleteEducationMaterial,
  updateEducationMaterial,
};
