import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getUserAppliedJobs,
    getRecruiterPostedJobs, 
    applyToJob,
    handleJobApplication
} from "../controllers/job.controller.js";
import upload from "../middleware/upload.middleware.js";
import { recruiterRoute } from "../middleware/recruiter.middleware.js";

const router = express.Router();


router.get("/", protectRoute, getAllJobs);
router.get("/applied/me", protectRoute, getUserAppliedJobs);
router.get("/posted/me", protectRoute,recruiterRoute, getRecruiterPostedJobs);
router.put("/:jobId/applicant/:applicantId/status", protectRoute, recruiterRoute, handleJobApplication);

router.post("/:id", protectRoute,applyToJob)
router.post("/", protectRoute, recruiterRoute,upload.single("image"), createJob);
router.delete("/:id", protectRoute, recruiterRoute,deleteJob);

export default router;
