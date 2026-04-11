import express from "express";
import {
    createPlaylist,
    getAllPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    deletePlaylist,
    generatePlaylist
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.post("/", createPlaylist);
router.get("/", getAllPlaylists);
router.get("/generate", generatePlaylist);
router.get("/:id", getPlaylistById);
router.post("/:id/add-video", addVideoToPlaylist);
router.delete("/:id", deletePlaylist);

export default router;