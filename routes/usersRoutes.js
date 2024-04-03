import express from "express";
import { allUsers } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/all-users", allUsers);

export default router;
