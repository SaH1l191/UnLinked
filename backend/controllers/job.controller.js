import Job from "../models/job.model.js";
import User from "../models/user.model.js";

export const createJob = async (req, res) => {
    try {
        const { title, company, location, description, requirements } = req.body;
        const job = new Job({
            title,
            company,
            location,
            description,
            requirements,
            postedBy: req.user._id
        });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name username profilePicture");
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUserAppliedJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ "applicants.user": req.user._id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getRecruiterPostedJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};