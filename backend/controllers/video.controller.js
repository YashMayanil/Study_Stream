import Video from "../models/video.model.js"

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