import asyncHandler from "express-async-handler";
import User from "../models/users.model.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth the user/ set token
// route POST /api/users/auth
// @access Public
const authUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // console.log("user", user);
  if (user && (await User.verifyPasswords(password, user?.password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Oops!! User not found. Invalid email or password.");
  }
});

// @desc Register a user
// route POST /api/users
// @access Public
const registerUserController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const encodedPassword = await User.encodePassword(password);

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("That email is already taken. Try another");
  }

  const user = await User.create({
    name,
    email,
    password: encodedPassword,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data.");
  }
});

// @desc Logout a user
// route POST /api/users/logout
// @access Public
const logoutUserController = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "User Logged out successfully." });
});

// @desc Get a user profile
// route GET /api/users/profile
// @access Private
const getUserProfileController = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc Update a user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("Sorry!! User not found...");
  }

  const updatePassword = req.body.password
    ? await User.encodePassword(req.body.password)
    : null;

  const isEmailUnchanged =
    req.body.email === "" || user.email === req.body.email;

  if (!isEmailUnchanged) {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res.status(404);
      throw new Error("Oops!! Email already taken. Try another");
    }
  }

  const updatedUser = {
    name: req.body.name || user.name,
    email: isEmailUnchanged ? user.email : req.body.email,
    password: updatePassword || user.password,
  };

  // the "new" flag will return the latest document rather than returning the older document with old credentials
  const updatedUserDocument = await User.findOneAndUpdate(
    { _id: req.user._id },
    updatedUser,
    { new: true }
  );

  const responsePayload = {
    _id: user._id,
    name: updatedUserDocument.name,
    email: updatedUserDocument.email,
  };

  res.status(200).json(responsePayload);
});

export {
  authUserController,
  getUserProfileController,
  logoutUserController,
  registerUserController,
  updateUserProfileController,
};
