import express from "express";
import {
  authUserController,
  getUserProfileController,
  logoutUserController,
  registerUserController,
  updateUserProfileController,
} from "../controllers/userControllers.js";
import { protectApiRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUserController);
router.post("/", registerUserController);
router.post("/logout", logoutUserController);

router
  .route("/profile")
  .get(protectApiRoutes, getUserProfileController)
  .put(protectApiRoutes, updateUserProfileController);

export default router;
