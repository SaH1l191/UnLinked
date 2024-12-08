import express from "express";
import dotenv from "dotenv";
import authRoutes from './routers/auth.route.js';
import userRoutes from './routers/user.route.js';
import postRoutes from './routers/post.route.js';
import notificationRoutes from './routers/notification.route.js';
import connectionRoutes from "./routers/connection.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

dotenv.config();

// Get current directory for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? "https://unlinked-b1ye.onrender.com" : "http://localhost:3000", 
    credentials: true,
}));

// Middleware for JSON parsing and cookies
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Serve frontend React app in production
if (process.env.NODE_ENV === "production") {
    const staticDir = path.join(__dirname, "../frontend/dist");
    app.use(express.static(staticDir));

    // Fallback route to serve React's index.html for all other requests (like deep links)
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(staticDir, "index.html"));
    });
}

// Start server and connect to DB
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
