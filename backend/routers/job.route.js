import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getUserAppliedJobs,
    getRecruiterPostedJobs
} from "../controllers/job.controller.js";
import { recruiterRoute } from "../middleware/recruiter.middleware.js";

const router = express.Router();

router.post("/", protectRoute, recruiterRoute, createJob);
router.delete("/:id", protectRoute, recruiterRoute,deleteJob);
router.get("/", protectRoute, getAllJobs);
router.get("/applied/me", protectRoute, getUserAppliedJobs);
router.get("/posted/me", protectRoute,recruiterRoute, getRecruiterPostedJobs);

export default router;
