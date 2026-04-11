import Playlist from "../models/playlist.model.js";

// ➤ Create playlist
export const createPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.create(req.body);

        res.status(201).json({
            success: true,
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get all playlists
export const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find()
            .populate("videos") // important
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            playlists
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get single playlist
export const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
            .populate("videos");

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Add video to playlist
export const addVideoToPlaylist = async (req, res) => {
    try {
        const { videoId } = req.body;

        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        playlist.videos.push(videoId);
        await playlist.save();

        res.status(200).json({
            message: "Video added to playlist",
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete playlist
export const deletePlaylist = async (req, res) => {
    try {
        await Playlist.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Playlist deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};