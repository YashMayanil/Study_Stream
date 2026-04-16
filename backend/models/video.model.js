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

export default mongoose.model("Video", videoSchema);