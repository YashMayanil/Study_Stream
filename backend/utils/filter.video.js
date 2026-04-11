export const isEducational = (video) => {
    const title = video.snippet.title.toLowerCase();
    const channel = video.snippet.channelTitle.toLowerCase();

    const keywords = [
        "lecture", "tutorial", "course",
        "class", "math", "physics", "coding", "dsa"
    ];

    return keywords.some(word => 
        title.includes(word) || channel.includes(word)
    );
};