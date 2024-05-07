const express = require("express");
const {
  getRelaxations,
  getRelaxationById,
  createRelaxation,
  deleteRelaxation,
  updateRelaxation,
} = require("../controllers/relaxationController");
const validateToken = require("../middleware/validateTokenHandler");
const validateAdmin = require("../middleware/validateAdmin");

const router = express.Router();

// GET /api/relaxations
router.get("/", validateToken, getRelaxations);

// GET /api/relaxations/:id
router.get("/:id", validateToken, getRelaxationById);

// POST /api/relaxations
router.post("/", validateToken, validateAdmin, createRelaxation);

// PUT /api/relaxations/:id
router.put("/:id", validateToken, validateAdmin, updateRelaxation);

// DELETE /api/relaxations/:id
router.delete("/:id", validateToken, validateAdmin, deleteRelaxation);

module.exports = router;
