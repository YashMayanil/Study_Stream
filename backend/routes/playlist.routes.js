import express from "express";
import {
  createPlaylist,
  getPlaylists,
  getVideosByPlaylist,
} from "../controllers/playlist.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔹 CREATE 
router.post("/", authMiddleware, createPlaylist);

// 🔹 GET playlists
router.get("/", getPlaylists);

// 🔹 GET videos of playlist
router.get("/:name/videos", getVideosByPlaylist);

export default router;