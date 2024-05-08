const express = require("express");
const {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");
const validateToken = require("../middleware/validateTokenHandler");
const validateAdmin = require("../middleware/validateAdmin");

const router = express.Router();

// GET /api/activities
router.get("/", validateToken, getActivities);

// POST /api/activities
router.post("/", validateToken, validateAdmin, createActivity);

// GET /api/activities/:id
// PUT /api/activities/:id
// DELETE /api/activities/:id
router
  .route("/:id")
  .get(validateToken, getActivityById)
  .put(validateToken, validateAdmin, updateActivity)
  .delete(validateToken, validateAdmin, deleteActivity);

module.exports = router;
