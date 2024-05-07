const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const validateAdmin = require("../middleware/validateAdmin");

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

// POST /api/users/login
router.post("/login", loginUser);

// GET /api/users/current
router.get("/current", validateToken, validateAdmin, currentUser);

// PUT /api/users/:id
// DELETE /api/users/:id
// GET /api/users/:id
router
  .route("/:id")
  .put(validateToken, validateAdmin, updateUser)
  .delete(validateToken, validateAdmin, deleteUser)
  .get(validateToken, validateAdmin, getUserById);

// GET /api/users
router.get("/", validateToken, validateAdmin, getAllUsers);

module.exports = router;
