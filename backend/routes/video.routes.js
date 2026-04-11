import express from "express"
import { createVideo, getVideosByFilter } from "../controllers/video.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",authMiddleware,createVideo);
router.get("/",getVideosByFilter)

export default router;
