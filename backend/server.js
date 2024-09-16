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

dotenv.config();


const app = express()
const PORT = process.env.PORT || 5000;


	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);

app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/notifications", notificationRoutes)
app.use("/api/v1/connections", connectionRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});  