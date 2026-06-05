// this is used to create notes while watching the video 

import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    content: String
}, { timestamps: true });

// ─── Indexes ──────────────────────────────────────────────────────────────────

// 1. Compound index: fetch all notes for a specific user + video combo fast
//    Used by: GET /api/notes/:videoId (when wired up)
noteSchema.index({ user: 1, video: 1 });

// 2. Index on user alone: fetch all notes by a user (for profile/notes dashboard)
noteSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Note", noteSchema);