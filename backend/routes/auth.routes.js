import express from "express";
import {loginUserController, registerUserController, googleLoginController, updatePasswordController} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/updatePassword", updatePasswordController)
router.post("/google", googleLoginController);


export default router;