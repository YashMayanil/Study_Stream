import express from "express";
import { getMe, toggleFavourite, toggleWatchLater } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.get("/me", authMiddleware, getMe);
router.post("/favourite/:videoId", authMiddleware, toggleFavourite);
router.post("/watchlater/:videoId", authMiddleware, toggleWatchLater);

export default router;
