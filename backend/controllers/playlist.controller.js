import Playlist from "../models/playlist.model.js";
import Video from "../models/video.model.js";

// 🔹 CREATE PLAYLIST
export const createPlaylist = async (req, res) => {
  try {
    const { name, subject, class: className } = req.body;

    if (!name || !subject || !className) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // prevent duplicate playlist
    const existing = await Playlist.findOne({ name, subject, class: className });

    if (existing) {
      return res.status(409).json({
        message: "Playlist already exists",
      });
    }

    const playlist = await Playlist.create({
      name,
      subject,
      class: className,
    });

    res.status(201).json({
      message: "Playlist created successfully",
      playlist,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating playlist",
      error: error.message,
    });
  }
};


// 🔹 GET PLAYLISTS (FILTER)
export const getPlaylists = async (req, res) => {
  try {
    const { subject, class: className } = req.query;

    let filter = {};

    if (subject) filter.subject = subject;
    if (className) filter.class = className;

    const playlists = await Playlist.find(filter);

    res.status(200).json(playlists);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching playlists",
      error: error.message,
    });
  }
};


// 🔹 GET VIDEOS BY PLAYLIST
export const getVideosByPlaylist = async (req, res) => {
  try {
    const { name } = req.params;

    const videos = await Video.find({ playlist: name });

    res.status(200).json(videos);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching playlist videos",
      error: error.message,
    });
  }
};