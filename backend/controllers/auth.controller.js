import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import axios from "axios"


// registering user with username, email, password
const registerUserController = async (req, res) => {
    try {
        const { username, password, email } = req.body;

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

        const hashPass = await bcrypt.hash(password, 12);

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

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // Google-only users have no password
        if (!user.password) {
            return res.status(401).json({ message: "This account uses Google sign-in. Please use 'Continue with Google'." });
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

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
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
}


// ─── Google OAuth Login ────────────────────────────────────────────────────────
// The frontend sends us the Google access_token from @react-oauth/google.
// We call Google's userinfo endpoint to verify it, then find or create the user.
const googleLoginController = async (req, res) => {
    try {
        const { access_token } = req.body;

        if (!access_token) {
            return res.status(400).json({ message: "Google access token is required" });
        }

        // Fetch the user's Google profile using their access_token
        const { data: googleUser } = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        const { email, name, sub: googleId } = googleUser;

        if (!email) {
            return res.status(400).json({ message: "Could not retrieve email from Google" });
        }

        // Find existing user or create a new one (upsert)
        let user = await User.findOne({ email });

        if (!user) {
            // New Google user — create without password
            user = await User.create({
                username: name || email.split("@")[0],
                email,
                googleId,
                // password intentionally omitted (optional in schema)
            });
        }

        // Issue our own JWT (same as normal login)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        res.status(200).json({
            message: "Google login successful",
            token,
            user: userResponse,
        });

    } catch (error) {
        console.error("Google login error:", error.response?.data || error.message);
        res.status(500).json({ message: "Google authentication failed. Please try again." });
    }
};
// ──────────────────────────────────────────────────────────────────────────────

export {
    loginUserController,
    registerUserController,
    googleLoginController,
}