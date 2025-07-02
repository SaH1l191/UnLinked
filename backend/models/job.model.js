import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: { type: String },
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected"],
    default: "applied"
  },
  appliedAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  description: String,
  requirements: [String],
  image : String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  applicants: [applicantSchema],
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
