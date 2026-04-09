import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// registering user with username, email, password
const registerUserController= async(req,res)=>{
    try {
        const {username,password,email} = req.body;

    if(!username||!email||!password){
        return res.status(404).json({message:"All fields are requried"})
    }

    const checkEmail = await User.findOne({email});
    
    if(checkEmail){
        return res.status(400).json({message:"User already exits with this email..."})    
    }

    const hashPass = await bcrypt.hash(password,10);

    const newUser = await User.create({
        username,
        password:hashPass,
        email,
    })

    const userResponse = {
        id:newUser._id,
        username:newUser.username,
        email:newUser.email,
    }

    res.status(201).json({message:"user registerd succesfully",user:userResponse})
    } catch (error) {
        console.log(error)
    }
}


// login user with email and password
const loginUserController = async(req,res)=>{
    try {

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"For login all fields are required..."})
        }

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(401).json({message:"User not found ...."})
        }

        const comparePass = await bcrypt.compare(password,user.password)
        
        if(!comparePass){
            return res.status(401).json({message:"Invalid credentials..."})
        }

        //now if password matches generate the token for user
        const token = jwt.sign(
            {id:user._id,username:user.username,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}    
        )

        const userResponse = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        res.status(200).json({
            message:"User loged in succesfully",
            token,
            user:userResponse
        })
        
    } catch (error) {
        console.log(error)
    }

}

export{
    loginUserController,
    registerUserController,
}