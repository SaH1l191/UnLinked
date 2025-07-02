import { MapPin, Users, Clock } from "lucide-react";

const PostedJobCard = ({ job, user, getStatusBadge, onUpdateStatus }) => (
  <div
    key={job._id}
    className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
  >
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            {job.image && (
              <img
                src={job.image || "/placeholder.svg"}
                alt="Company"
                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <span className="text-blue-600 font-semibold">{job.company}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    Requirements:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Applicants Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Applicants</h4>
            <p className="text-sm text-gray-500">{job.applicants.length} total applications</p>
          </div>
        </div>
        {job.applicants.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No applicants yet</p>
            <p className="text-sm text-gray-400">
              Applications will appear here once candidates apply
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Resume
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Applied
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {job.applicants.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.user?.profilePicture || "/avatar.png"}
                            alt={app.user?.name || "User"}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {app.user?.name || "N/A"}
                            </p>
                            <p className="text-sm text-gray-500">{app.user?.email || ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(app.status)}`}
                        >
                          {app.status}
                        </span>
                        {user?.role === "recruiter" && (
                          <select
                            value={app.status}
                            onChange={e => onUpdateStatus(job._id, app.user._id, e.target.value)}
                            className="ml-2 border rounded px-2 py-1"
                          >
                            <option value="shortlisted">shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {app.resumeLink ? (
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">No resume</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default PostedJobCard;