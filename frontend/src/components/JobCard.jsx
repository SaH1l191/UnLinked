"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MapPin, Building, Clock, Trash, X } from "lucide-react"
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
      <div className="border border-gray-200 bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
        {isRecruiter && (
          <button
            onClick={() => onDelete(job._id)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete Job"
          >
            <Trash size={16} />
          </button>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{job.location}</span>
            </div>
          </div>
          {job.image && (
            <img
              src={job.image || "/placeholder.svg"}
              alt="Company"
              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
            />
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>

        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((req, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {req}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Posted recently</span>
          </div>
          <button
            onClick={() => setShowPopup(true)}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Submit Resume</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company} • {job.location}
              </p>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume Link</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://your-resume-link.com"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={applyToJobMutation.isLoading}
                >
                  {applyToJobMutation.isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
