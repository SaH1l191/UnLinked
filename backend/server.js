import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from "passport";
import rateLimit from "express-rate-limit";

import notificationRoutes from './routers/notification.route.js' 
import connectionRoutes from './routers/connection.route.js'
import authRoutes from './routers/auth.route.js' 
import userRoutes from './routers/user.route.js'
import postRoutes from './routers/post.route.js'
import jobRoutes from './routers/job.route.js'
import { connectDB } from "./lib/db.js";
import job from "./cron/cron.js";
import "./utils/google-auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// console.log("dirname",__dirname)

if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}

app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.use("/api/v1/jobs", jobRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// job.start(); 

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

app.use("/api/", apiLimiter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	connectDB();
});