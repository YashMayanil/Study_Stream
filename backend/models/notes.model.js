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

export default mongoose.model("Note", noteSchema);