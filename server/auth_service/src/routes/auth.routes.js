import { Router } from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
  sendRecoveryMail,
} from "../controllers/user.controller";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// forgot password
router.route("/send-recovery-email").post(sendRecoveryMail);
router.route("/reset-password").post(changePassword);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
