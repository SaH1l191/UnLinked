import { MapPin, Building, Clock, ArrowRight, Trash } from "lucide-react"

const JobCard = ({ job, onApply, onDelete, user }) => {
  const isRecruiter = user?.role === "recruiter" && job.postedBy === user._id

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-blue-600 font-semibold mb-1">
              <Building className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{job.location}</span>
            </div>
          </div>
          {job.image && (
            <img
              src={job.image || "/placeholder.svg"}
              alt="Company"
              className="w-12 h-12 rounded-lg object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
            />
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{job.description}</p>

        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((req, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-200"
                >
                  {req}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {job.image && (
          <div className="mb-6">
            <img
              src={job.image || "/placeholder.svg"}
              alt="Job"
              className="w-full h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Posted recently</span>
          </div>
          <button
            onClick={() => onApply?.(job._id)}
            className="text-xs group/btn rounded-full inline-flex items-center gap-2 px-4 py-2 bg-slate-200 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Apply Now
            <ArrowRight className="w-4 h-4 " />
          </button>
        </div>
      </div>
      {isRecruiter && (
        <button
          onClick={() => onDelete(job._id)}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          title="Delete Job"
        >
          <Trash size={18} />
        </button>
      )}
    </div>
  )
}

export default JobCard