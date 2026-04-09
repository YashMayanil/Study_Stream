import Video from "../models/video.model.js";

// creating video in backend 

export const createVideo= async (req,res)=>{
    try {
        const {title,subject,class:className,playlist, youtubeId} = req.body;

        if(!title || !subject || !className || !playlist || youtubeId){
            return res.status(400).json({
                message:"All fields are erquired..."
            })
        }

        const video = await Video.create({
            title,
            youtubeId,
            subject,
            class:className,
            playlist
        })

        res.status(201).json({
            message:"Youtube video is added .... ",
            video,
        })


    } catch (error) {
        
    }
}

// getting all video as per requirement 
export const getVideosByFilter = async (req, res) => {
  try {
    const { subject, class: className, playlist } = req.query;

    let filter = {};

    if (subject) filter.subject = subject;
    if (className) filter.class = className;
    if (playlist) filter.playlist = playlist;

    const videos = await Video.find(filter);

    res.status(200).json(videos);

  } catch (error) {
    res.status(500).json({
      message: "Error filtering videos",
      error: error.message,
    });
  }
};