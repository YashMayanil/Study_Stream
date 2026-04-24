import express from "express";
import {
    addVideo,
    getAllVideos,
    getVideoById,
    deleteVideo,
    searchAndStoreVideos,
    getVideoCounts
} from "../controllers/video.controller.js";

const router = express.Router();

router.post("/", addVideo);
router.get("/", getAllVideos);
router.get("/search/youtube",searchAndStoreVideos) // it Searches from youtube api not from normal 
router.get("/counts", getVideoCounts);
router.get("/:id", getVideoById);
router.delete("/:id", deleteVideo);

export default router;