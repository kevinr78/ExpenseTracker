import express from "express";
import { loginUser, signInUser } from "../controllers/auth.controller.js";
const router = express.Router();
import { verifyJWT } from "../utils/JWT.js";

router.post("/login", loginUser);
router.post("/register", signInUser);

export default router;
