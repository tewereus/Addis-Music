import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  blockUser,
  unblockUser,
  updatePassword,
  deleteUser,
  updateUser,
  forgotPasswordToken,
  resetPassword,
} from "../controller/userCtrl.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-users", protect, authorize, getAllUsers);
router.get("/user-profile", protect, getUser);
router.put("/block-user/:id", protect, authorize, blockUser);
router.put("/unblock-user/:id", protect, authorize, unblockUser);
router.put("/user-profile/update-password", protect, updatePassword);
router.delete("/user-profile/delete-user", protect, deleteUser);
router.put("/user-profile/update-user", protect, updateUser);
router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

export default router;
