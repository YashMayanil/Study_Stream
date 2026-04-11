import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const searchYouTubeVideos = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: "snippet",
                q: query,
                key: process.env.YOUTUBE_API_KEY,
                maxResults: 10,
                type: "video",
                videoEmbeddable: true
            }
        });

        return response.data.items;
    } catch (error) {
        console.error("YT API Error:", error.message);
        throw error;
    }
};