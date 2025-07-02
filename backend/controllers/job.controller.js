import cloudinary from "../lib/cloudinary.js";
import Job from "../models/job.model.js";
import streamifier from "streamifier";
import Notification from "../models/notification.model.js";

export const createJob = async (req, res) => {
    try {
        const { title, company, location, description, requirements } = req.body;

        // Basic validation
        if (!title || !company || !location || !description) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Prepare job data
        const jobData = {
            title,
            company,
            location,
            description,
            postedBy: req.user._id,
        };
        jobData.requirements = req.body.requirements.split(",").map(s => s.trim());

        // Upload image if provided
        if (req.file) {
            const uploadFromBuffer = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "jobs" },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result.secure_url);
                        }
                    );
                    streamifier.createReadStream(fileBuffer).pipe(stream);
                });
            };

            const imageUrl = await uploadFromBuffer(req.file.buffer);
            jobData.image = imageUrl;
        }

        const job = new Job(jobData);
        await job.save();

        res.status(201).json({ message: "Job Created Successfully", job });

    } catch (error) {
        console.error("Job creation error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
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
        const jobs = await Job.find({ postedBy: req.user._id })
            .populate("applicants.user", "name username email profilePicture");

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const applyToJob = async (req, res) => {
    try {
        const { resume } = req.body;
        const { id } = req.params;
        if (!resume) return res.status(400).json({ message: "Please provide resume link" });
        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        const applicant = {
            user: req.user._id,
            status: "applied",
            resumeLink: resume,
            appliedAt: Date.now()
        };
        if (job.applicants.find((a) => a.user == user)) {
            return res.status(409).json({ message: "You have already applied to this job" });
        }
        job.applicants.push(applicant);
        await job.save();

        const notification = new Notification({
            recipient: job.postedBy,
            type: "jobStatus",
            relatedUser: req.user._id,
            relatedPost: job._id,
            read: false,
        });
        await notification.save();

        return res.status(201).json({ message: "Applied successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const handleJobApplication = async (req, res) => {
    try {
        const { jobId, applicantId } = req.params;
        const { status } = req.body;


        const validStatuses = ["pending", "shortlisted", "rejected", ];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });


        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const applicant = job.applicants.find(app =>
            app.user.toString() === applicantId
        );
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }
        applicant.status = status;
        await job.save();

        const notification = new Notification({
            recipient: applicantId,
            type: "jobStatus",
            relatedUser: req.user._id, //always the recruiter
            relatedPost: jobId,
            read: false,
        });
        await notification.save();

        res.status(200).json({ message: "Application status updated and notification sent" });

    }
    catch (error) {
        console.error(error); // This will log the error to your server console for debugging
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}