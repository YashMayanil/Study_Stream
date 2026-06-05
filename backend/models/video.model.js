import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    videoId: {
        type: String, // YouTube video ID
        required: true,
        unique: true,
    },

    thumbnail: {
        type: String,
    },

    channelTitle: {
        type: String,
    },

    category: {
        type: String,
        enum: [
            "class-10",
            "class-11",
            "class-12",
            "dsa",
            "web-dev",
            "science",
            "maths",
            "physics",
            "chemistry",
            "science",
            "general-knowlege"
        ],
        required: true,
    },

    subject: {
        type: String, // optional (Physics, Chemistry, etc.)
    },

    duration: {
        type: String, // ISO duration from YouTube
    },

    views: {
        type: Number,
    },

    isVerifiedEducational: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true,
});

// ─── Indexes ──────────────────────────────────────────────────────────────────

// 1. Compound index: fast lookup of videos by category sorted by newest first
//    Used by: getAllVideos, generatePlaylist, searchAndStoreVideos
videoSchema.index({ category: 1, createdAt: -1 });

// 2. Text index: enables full-text search on title & description
//    Usage: Video.find({ $text: { $search: "binary tree" } })
videoSchema.index({ title: "text", description: "text" });


export default mongoose.model("Video", videoSchema);