import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getPublicProfile, getSuggestedConnections, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

//getting the user's suggested connections
router.get("/suggestions", protectRoute, getSuggestedConnections)
//getting the user's suggested connections by quering the linkedin profile URL of other users
router.get("/:username", protectRoute, getPublicProfile)

router.put("/profile", protectRoute, updateProfile)
export default router;
