// New file: src/components/ApplyJobModal.jsx
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ApplyJobModal = ({ jobId, onClose, onSuccess }) => {
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post(`/jobs/${jobId}`, { resume });
      toast.success("Application submitted!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Resume Link</label>
        <input
          type="url"
          value={resume}
          onChange={e => setResume(e.target.value)}
          required
          className="input"
          placeholder="Paste your resume link"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Applying..." : "Apply"}
        </button>
        <button type="button" className="btn" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ApplyJobModal;