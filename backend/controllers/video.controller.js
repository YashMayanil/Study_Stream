import Video from "../models/video.model.js"
import { searchYouTubeVideos } from "../services/youtube.api.js";
import { isEducational } from "../utils/filter.video.js";


// ➤ Add video (store from YouTube API or manually)
export const addVideo = async (req, res) => {
    try {
        const video = await Video.create(req.body);
        res.status(201).json({
            success: true,
            video
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get all videos
export const getAllVideos = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};
        if (category) {
            filter.category = category;
        }

        const videos = await Video.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: videos.length,
            videos
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get single video
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete video (optional admin)
export const deleteVideo = async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Video deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchAndStoreVideos = async (req, res) => {
    try {
        const { query, category } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Query required" });
        }

        // 1. Fetch from YouTube
        const ytVideos = await searchYouTubeVideos(query);

        // 2. Filter educational videos
        const filtered = ytVideos.filter(isEducational);

        // 3. Transform data
        const formattedVideos = filtered.map(video => ({
            title: video.snippet.title,
            description: video.snippet.description,
            videoId: video.id.videoId,
            thumbnail: video.snippet.thumbnails.high.url,
            channelTitle: video.snippet.channelTitle,
            category: category || "general"
        }));

        // 4. Save to DB (avoid duplicates)
        const savedVideos = [];

        for (let vid of formattedVideos) {
            const exists = await Video.findOne({ videoId: vid.videoId });

            if (!exists) {
                const newVideo = await Video.create(vid);
                savedVideos.push(newVideo);
            } else {
                savedVideos.push(exists);
            }
        }

        // 5. Send response
        res.status(200).json({
            success: true,
            count: savedVideos.length,
            videos: savedVideos
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};