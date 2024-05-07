const express = require("express");
const {
  getEmotions,
  getEmotionById,
  createEmotion,
  deleteEmotion,
  updateEmotion,
} = require("../controllers/emotionController");
const validateToken = require("../middleware/validateTokenHandler");
const validateAdmin = require("../middleware/validateAdmin");

const router = express.Router();

// GET /api/emotions
router.get("/", validateToken, getEmotions);

// GET /api/emotions/:id
router.get("/:id", validateToken, getEmotionById);

// POST /api/emotions
router.post("/", validateToken, validateAdmin, createEmotion);

// PUT /api/emotions/:id
router.put("/:id", validateToken, validateAdmin, updateEmotion);

// DELETE /api/emotions/:id
router.delete("/:id", validateToken, validateAdmin, deleteEmotion);
