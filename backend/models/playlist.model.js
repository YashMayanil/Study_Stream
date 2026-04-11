import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", playlistSchema);