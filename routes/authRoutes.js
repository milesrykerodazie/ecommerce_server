import express from "express";
import {
  login,
  register,
  validateToken,
} from "../controllers/authControllers.js";
import { checkAndRenewToken } from "../middlewares/validate-token.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", checkAndRenewToken, validateToken);

export default router;
