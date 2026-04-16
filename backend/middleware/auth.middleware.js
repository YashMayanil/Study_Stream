import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token — throws if expired or invalid
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Find user in DB
        const user = await User.findById(decode.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: User no longer exists"
            });
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        // ✅ Fixed: Always send a response — was silently hanging before!
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        }
        console.error("Auth middleware error:", error);
        return res.status(500).json({ message: "Authentication error" });
    }
}
