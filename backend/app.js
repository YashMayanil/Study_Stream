import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.routes.js"

const app = express();


dotenv.config();
connectDB();


app.use(express.json());



const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})