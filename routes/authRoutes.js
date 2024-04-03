import express from "express";
import {
  login,
  register,
  validateToken,
} from "../controllers/authControllers.js";
import { isResetTokenValid } from "../middlewares/revalidate-token.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", isResetTokenValid, validateToken);

export default router;
