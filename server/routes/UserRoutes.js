import express from "express";
import {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Route to get all users (Admin only)
router.get("/", getAllUsers);

// Route to create a new user (registration)
router.post("/", createUser);

// Route to login a user (authenticate)
router.post("/login", loginUser);

// Route to update user data
router.put("/:id", updateUser);

// Route to delete a user (Admin only)
router.delete("/:id", deleteUser);

export default router;
