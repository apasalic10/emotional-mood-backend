const express = require("express");
const {
  getEducationMaterials,
  getEducationMaterialById,
  createEducationMaterial,
  deleteEducationMaterial,
  updateEducationMaterial,
} = require("../controllers/educationMaterialController");
const validateToken = require("../middleware/validateTokenHandler");
const validateAdmin = require("../middleware/validateAdmin");

const router = express.Router();

// GET /api/educationMaterials
router.get("/", validateToken, getEducationMaterials);

// GET /api/educationMaterials/:id
router.get("/:id", validateToken, getEducationMaterialById);

// POST /api/educationMaterials
router.post("/", validateToken, validateAdmin, createEducationMaterial);

// PUT /api/educationMaterials/:id
router.put("/:id", validateToken, validateAdmin, updateEducationMaterial);

// DELETE /api/educationMaterials/:id
router.delete("/:id", validateToken, validateAdmin, deleteEducationMaterial);

module.exports = router;
