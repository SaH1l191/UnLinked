// New file: src/components/CreateJobForm.jsx
import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const JobModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  // Close on Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close on click outside modal
  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      await axiosInstance.post("/jobs", data);
      toast.success("Job created!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-xl shadow-lg p-8 animate-fade-in"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="Requirements (comma separated)"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobModal;