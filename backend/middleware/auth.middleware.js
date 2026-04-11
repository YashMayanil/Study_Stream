import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

 export const authMiddleware = async(req,res,next)=>{
    try {
        
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message:"Unautorized user..."
            })
        }

        //extract token
        const token = authHeader.split(" ")[1];

        //verify token 
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        //find user
        const user = await User.findById(decode.id).select("-password");

        if(!user){
            return res.status(401).json({
                message:"User not found.."
            })
        }

        //attach user
        req.user = user;
        
        next(); // this is used to go to next controller 

    } catch (error) {
        console.log(error)
    }
}

