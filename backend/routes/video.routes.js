import express from "express";
import {
    addVideo,
    getAllVideos,
    getVideoById,
    deleteVideo,
    searchAndStoreVideos
} from "../controllers/video.controller.js";

const router = express.Router();

router.post("/", addVideo);
router.get("/", getAllVideos);
router.get("/search/youtube",searchAndStoreVideos)
router.get("/:id", getVideoById);
router.delete("/:id", deleteVideo);

export default router;