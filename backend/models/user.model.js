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

// ─── Indexes ──────────────────────────────────────────────────────────────────

// 1. email already has unique:true — Mongoose auto-creates a unique index
//    Explicitly adding sparse index on googleId for fast OAuth lookups
userSchema.index({ googleId: 1 }, { sparse: true });

// 2. Compound index for history queries: get a user's watch history sorted newest first
userSchema.index({ "history.video": 1, "history.watchedAt": -1 });

export default mongoose.model("User",userSchema)
