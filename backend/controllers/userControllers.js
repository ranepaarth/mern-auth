import asyncHandler from "express-async-handler";

// @desc Auth the user/ set token
// route POST /api/users/auth
// @access Public
const authUserController = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "auth user" });
});

// @desc Register a user
// route POST /api/users
// @access Public
const registerUserController = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "register user" });
});

// @desc Logout a user
// route POST /api/users/logout
// @access Public
const logoutUserController = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "logout user" });
});

// @desc Get a user profile
// route GET /api/users/profile
// @access Private
const getUserProfileController = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "user profile" });
});

// @desc Update a user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfileController = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "update user profile" });
});

export {
  authUserController,
  getUserProfileController,
  logoutUserController,
  registerUserController,
  updateUserProfileController,
};
