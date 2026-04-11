import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    category: {
        type: String,
        required: true,
    },

    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        }
    ],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // optional (admin or user)
    },

    thumbnail: {
        type: String,
    },

    isPublic: {
        type: Boolean,
        default: true,
    }

}, {
    timestamps: true,
});

export default mongoose.model("Playlist", playlistSchema);