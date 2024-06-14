import express from "express";
const router = express.Router()
import { signUp,signIn, register, login } from "../../controllers/authController.js";

router.post("/register",signUp) // Agent
router.post("/sign-up",register) // client
router.post("/login", signIn) // Agent
router.post("/sign-in", login) // client

export default router;


