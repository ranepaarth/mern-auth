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
    throw new Error("Sorry!! User not found.Invalid email or password.");
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
    throw new Error(
      "User with the same email id already exists. Please try logging in."
    );
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
  const user = User.findById(req.user._id);
  if (user) {
    const encodeUpdatedPassword = await User.encodePassword(req.body.password);

    let updatedUser = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      password: encodeUpdatedPassword || user.password,
    };

    // the "new" flag will return the latest document rather than returning the older (i.e. document with old credentials) document
    updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      updatedUser,
      {
        new: true,
      }
    );

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("Sorry!! User not found...");
  }
});

export {
  authUserController,
  getUserProfileController,
  logoutUserController,
  registerUserController,
  updateUserProfileController,
};
