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

// ─── Indexes ──────────────────────────────────────────────────────────────────

// 1. Index on category: fast lookup when generating a playlist for a subject
//    Used by: generatePlaylist, getAllPlaylists filtered by category
playlistSchema.index({ category: 1 });

// 2. Index on createdBy: fetch all playlists belonging to a specific user fast
playlistSchema.index({ createdBy: 1 });

// 3. Compound index: public playlists sorted newest first (for listing on homepage)
playlistSchema.index({ isPublic: 1, createdAt: -1 });

export default mongoose.model("Playlist", playlistSchema);