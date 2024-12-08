import express from "express";
import dotenv from "dotenv";
import authRoutes from './routers/auth.route.js';
import userRoutes from './routers/user.route.js';
import postRoutes from './routers/post.route.js';
import notificationRoutes from './routers/notification.route.js';
import connectionRoutes from "./routers/connection.route.js";
import cors from 'cors'
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 5000;


	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
app.use(express.json({ limit: "15mb" }));
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/notifications", notificationRoutes)
app.use("/api/v1/connections", connectionRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // React app
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});  