import express from "express";
import {
    addVideo,
    getAllVideos,
    getVideoById,
    deleteVideo
} from "../controllers/video.controller.js";

const router = express.Router();

router.post("/", addVideo);
router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.delete("/:id", deleteVideo);

export default router;