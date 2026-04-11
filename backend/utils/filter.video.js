import { trustedChannels } from "./trustedChannels.js";

export const isEducational = (video) => {
    const title = video.snippet.title.toLowerCase();
    const description = video.snippet.description.toLowerCase();
    const channel = video.snippet.channelTitle;


    const keywords = [
        "class", "lecture", "tutorial", "course",
        "math", "physics", "chemistry",
        "programming", "dsa", "coding",
        "education", "lesson"
    ];

     const isKeywordMatch = keywords.some(word => title.includes(word));
    const isTrusted = trustedChannels.includes(channel);

    return isKeywordMatch && isTrusted;

    // return keywords.some(word =>
    //     title.includes(word) || description.includes(word)
    // );
};