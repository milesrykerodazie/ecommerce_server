import express from "express";
import {
  login,
  register,
  validateToken,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validateToken);

export default router;
