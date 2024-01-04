import express from "express";
import {
  authUserController,
  getUserProfileController,
  logoutUserController,
  registerUserController,
  updateUserProfileController,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/auth", authUserController);
router.post("/", registerUserController);
router.post("/logout", logoutUserController);

router
  .route("/profile")
  .get(getUserProfileController)
  .put(updateUserProfileController);

export default router;
