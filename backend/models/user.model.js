import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:false,   // optional — Google OAuth users have no password
    },

    googleId:{
        type:String,
        default:null,
    },

    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    watchLater: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    history: [
        {
            video: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            },
            watchedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},{
    timestamps:true,
})

export default mongoose.model("User",userSchema)
