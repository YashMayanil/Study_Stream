import express from "express";
import {loginUserController, registerUserController, googleLoginController} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/google", googleLoginController);


export default router;