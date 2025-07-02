"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MapPin, Building, Clock, ArrowRight, Trash, X } from "lucide-react"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

const JobCard = ({ job, onDelete, user }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [resumeLink, setResumeLink] = useState("")
  const queryClient = useQueryClient()

  const isRecruiter = user?.role === "recruiter" && job.postedBy === user._id

  const applyToJobMutation = useMutation({
    mutationFn: async ({ jobId, resume }) => {
      return axiosInstance.post(`/jobs/${jobId}`, { resume })
    },
    onSuccess: () => {
      toast.success("Applied to job successfully!")
      queryClient.invalidateQueries({ queryKey: ["appliedJobs"] })
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      setShowPopup(false)
      setResumeLink("")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to apply to job")
    },
  })

  const handleApply = (e) => {
    e.preventDefault()
    if (!resumeLink.trim()) {
      toast.error("Please enter your resume link.")
      return
    }
    applyToJobMutation.mutate({ jobId: job._id, resume: resumeLink })
  }

  return (
    <>
      <div className="relative group rounded-xl border border-slate-200 bg-white overflow-hidden shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Delete button for recruiters */}
        {isRecruiter && (
          <button
            onClick={() => onDelete(job._id)}
            className="absolute top-4 right-4 z-10 p-2 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-full transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
            title="Delete Job"
          >
            <Trash size={16} />
          </button>
        )}

        <div className="relative p-6 md:p-8">
          {/* Header section */}
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <div className="flex-1 pr-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                {job.title}
              </h3>

              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <div className="flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 px-2 md:px-3 py-1.5 rounded-full">
                  <Building className="w-4 h-4" />
                  <span className="text-xs md:text-sm">{job.company}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium">{job.location}</span>
              </div>
            </div>

            {job.image && (
              <div className="relative">
                <img
                  src={job.image || "/placeholder.svg"}
                  alt="Company"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-600 text-xs md:text-sm mb-4 md:mb-6 line-clamp-3 leading-relaxed">{job.description}</p>

          {/* Requirements tags */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-4 md:mb-6">
              <div className="flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/50 hover:border-blue-300 transition-colors duration-300"
                  >
                    {req}
                  </span>
                ))}
                {job.requirements.length > 3 && (
                  <span className="px-2 md:px-3 py-1.5 bg-gradient-to-r from-slate-50 to-gray-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
                    +{job.requirements.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-4 md:pt-6 border-t border-slate-200/60 gap-3">
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
              <div className="p-1.5 bg-slate-100 rounded-full">
                <Clock className="w-3 h-3" />
              </div>
              <span className="font-xs text-xs">Posted recently</span>
            </div>

            <button
              onClick={() => setShowPopup(true)}
              className="w-fit group/btn relative overflow-hidden bg-black text-xs text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
            >
              <span className="relative z-10">Apply Now</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Submit Resume</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Job Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-1">{job.title}</h3>
              <p className="text-sm text-slate-600">
                {job.company} • {job.location}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Resume Link</label>
                <input
                  type="url"
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                  placeholder="https://your-resume-link.com"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="flex-1 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors duration-200"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={applyToJobMutation.isLoading}
                >
                  {applyToJobMutation.isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Applying...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default JobCard
