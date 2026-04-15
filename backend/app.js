import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.routes.js"
import videoRoutes from "./routes/video.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import cors from "cors";

const app = express();


dotenv.config();
connectDB();


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoutes);
app.use("/api/playlists", playlistRoutes);

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})