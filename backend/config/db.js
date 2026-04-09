import mongoose from "mongoose";

const connectDB = async(req,res)=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected...");
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;