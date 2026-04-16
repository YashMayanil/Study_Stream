import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// registering user with username, email, password
const registerUserController = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // ✅ Fixed: 400 Bad Request (not 404) for missing fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({ message: "User already exists with this email" })
        }

        const hashPass = await bcrypt.hash(password, 12); // ✅ Increased to 12 rounds

        const newUser = await User.create({
            username,
            password: hashPass,
            email,
        })

        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        }

        res.status(201).json({ message: "User registered successfully", user: userResponse })

    } catch (error) {
        console.error("Register error:", error);
        // ✅ Fixed: Always send a response even on server error
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
}


// login user with email and password
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email });

        // ✅ Fixed: Same generic message for both "not found" and "wrong password"
        // This prevents user enumeration attacks (attacker can't tell if email is registered)
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return res.status(401).json({ message: "Invalid email or password" }) // ✅ Same message
        }

        // ✅ Only store necessary data in JWT payload (not email/username — fetched from DB in middleware)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        res.status(200).json({
            message: "Logged in successfully",
            token,
            user: userResponse
        })

    } catch (error) {
        console.error("Login error:", error);
        // ✅ Fixed: Always send a response even on server error
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
}

export {
    loginUserController,
    registerUserController,
}