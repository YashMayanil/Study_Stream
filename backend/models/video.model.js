import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
     youtubeId: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    playlist: {
      type: String,
      required: true,
    },

},{
    timestamps:true,
})

export default mongoose.model("Video",videoSchema)