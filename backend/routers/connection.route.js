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



//userId - to whom we are sending the connection request
router.post("/request/:userId", protectRoute, sendConnectionRequest);
router.put("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);
// Get all connection requests for the current user
router.get("/requests", protectRoute, getConnectionRequests);
// Get all connections for a user
router.get("/", protectRoute, getUserConnections);
router.delete("/:userId", protectRoute, removeConnection);
router.get("/status/:userId", protectRoute, getConnectionStatus);



export default router;




