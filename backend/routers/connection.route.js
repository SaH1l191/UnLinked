import express from "express";
import {
    acceptConnectionRequest,
    getConnectionRequests,
    getConnectionStatus,
    getUserConnections,
    rejectConnectionRequest,
    removeConnection,
    sendConnectionRequest,
} from "../controllers/connection.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
const router = express.Router();



//userId - to whom we are sent the connection request
router.post("/request/:userId", protectRoute, sendConnectionRequest);
// actual ID of the connection request that you want to accept.
router.put("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);
// Get all connection requests for the current user
router.get("/requests", protectRoute, getConnectionRequests);
// Get all connections for a user
router.get("/", protectRoute, getUserConnections);
router.delete("/:userId", protectRoute, removeConnection);
router.get("/status/:userId", protectRoute, getConnectionStatus);
// /represents the ID of the user for whom you want to check the connection status relative to the currently authenticated user.

export default router;




