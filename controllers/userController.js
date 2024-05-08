const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password, isAdmin } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !firstname ||
    !lastname ||
    isAdmin === null
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
    isAdmin,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const expiresIn = user.isAdmin ? "30m" : null;

    const accessToken = jwt.sign(
      {
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      expiresIn ? { expiresIn } : undefined
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//@desc Get current user
//@route GET /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc Get all users
//@route GET /api/users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//@desc Update user
//@route PUT /api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password, isAdmin } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (username) user.username = username;
  if (email) user.email = email;
  if (isAdmin !== undefined) user.isAdmin = isAdmin;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await user.save();

  res.json(updatedUser);
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();

  res.json({ message: "User removed" });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
};
