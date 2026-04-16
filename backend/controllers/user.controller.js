import User from "../models/user.model.js";

// ➤ Get current user profile (with favourites & watchLater)
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")
            .populate("favourites")
            .populate("watchLater");

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Toggle Favourite (add if not present, remove if already added)
export const toggleFavourite = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const videoId = req.params.videoId;

        const alreadyFav = user.favourites.some(id => id.toString() === videoId);

        if (alreadyFav) {
            user.favourites = user.favourites.filter(id => id.toString() !== videoId);
        } else {
            user.favourites.push(videoId);
        }

        await user.save();

        res.status(200).json({
            success: true,
            isFavourite: !alreadyFav,
            message: alreadyFav ? "Removed from favourites" : "Added to favourites"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Toggle Watch Later (add if not present, remove if already added)
export const toggleWatchLater = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const videoId = req.params.videoId;

        const alreadyWL = user.watchLater.some(id => id.toString() === videoId);

        if (alreadyWL) {
            user.watchLater = user.watchLater.filter(id => id.toString() !== videoId);
        } else {
            user.watchLater.push(videoId);
        }

        await user.save();

        res.status(200).json({
            success: true,
            isWatchLater: !alreadyWL,
            message: alreadyWL ? "Removed from watch later" : "Added to watch later"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
