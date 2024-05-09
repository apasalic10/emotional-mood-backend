const express = require("express");
const {
  getEmotionEntries,
  getEmotionEntryById,
  createEmotionEntry,
  deleteEmotionEntry,
} = require("../controllers/emotionEntryController");
const validateToken = require("../middleware/validateTokenHandler");
const validateAdmin = require("../middleware/validateAdmin");

const router = express.Router();

// GET /api/emotionEntries
router.get("/", validateToken, validateAdmin, getEmotionEntries);

// GET /api/emotionEntries/:id
router.get("/:id", validateToken, validateAdmin, getEmotionEntryById);

// POST /api/emotionEntries
router.post("/", validateToken, createEmotionEntry);

// DELETE /api/emotionEntries/:id
router.delete("/:id", validateToken, validateAdmin, deleteEmotionEntry);

module.exports = router;
