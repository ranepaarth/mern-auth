import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

const protectApiRoutes = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // userId already set while generating token. 
      
      //we are attaching the user to the req object so that it can be accessed after authorization(user logs in).
      req.user = await User.findById(decodedToken.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Oops!! Invalid token.");
    }
  } else {
    res.status(401);
    throw new Error("Sorry!! Please login/signup to continue...");
  }
});


export {protectApiRoutes}