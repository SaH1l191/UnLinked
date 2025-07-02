import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { Briefcase, MapPin, Building, Clock, CheckCircle } from "lucide-react"
import AllJobs from "./AllJobs"

const ListJobs = () => {
    const { data: jobs, isLoading: jobsLoading } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const res = await axiosInstance.get("/jobs")
            return res.data
        },
    })

    const { data: appliedJobs, isLoading: appliedJobsLoading } = useQuery({
        queryKey: ["appliedJobs"],
        queryFn: async () => {
            const res = await axiosInstance.get("/jobs/applied/me")
            return res.data
        },
        refetchInterval: 5000, //polling to make sure that applicant will see the latest data 

        refetchIntervalInBackground: true,
    })

    const { data: currentUser } = useQuery({ queryKey: ["authUser"] });
    const currentUserId = currentUser?._id;

    const getStatusBadge = (status) => {
        const statusStyles = {
            //shortlisted , rejected
            applied: "bg-slate-100 text-green-800 border-black-200",
            // pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            shortlisted: " text-green-800 border-green-200",
            // reviewed: "bg-blue-100 text-blue-800 border-blue-200",
            rejected: "bg-red-100 text-red-800 border-red-200",
        };

        return statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"
    }

    return (
        <div className="space-y-8">
            {/* Applied Jobs Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Jobs You Applied To</h2>
                            <p className="text-green-100">Track your application status</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {appliedJobsLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                                <span className="text-gray-600 font-medium">Loading applied jobs...</span>
                            </div>
                        </div>
                    ) : appliedJobs && appliedJobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {appliedJobs.map((job) => {
                                const myApplication = job.applicants?.find(
                                    (app) => app.user === currentUserId || app.user?._id === currentUserId,
                                )
                                return (
                                    <div
                                        key={job._id}
                                        className={
                                            `group rounded-xl overflow-hidden transition-all duration-300 border
                                            ${myApplication?.status === "rejected"
                                                ? " border-red-400"
                                                : myApplication?.status === "shortlisted"
                                                    ? " border-green-400"
                                                    : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                                            }
                                            hover:shadow-xl`
                                        }
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3
                                                        className={
                                                            `text-sm font-semibold mb-2 transition-colors ${myApplication?.status === "rejected"
                                                                ? "text-red-700 group-hover:text-red-800"
                                                                : myApplication?.status === "shortlisted"
                                                                    ? "text-green-700 group-hover:text-green-800"
                                                                    : "text-gray-900 group-hover:text-green-600"
                                                            }`
                                                        }
                                                    >
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
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(myApplication?.status)}`}
                                                >
                                                    {myApplication?.status || "Applied"}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{job.description}</p>

                                            {job.requirements && job.requirements.length > 0 && (
                                                <div className="mb-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.requirements.slice(0, 3).map((req, index) => (
                                                            <span
                                                                key={index}
                                                                className={
                                                                    `px-2 py-1 text-xs font-medium rounded-md border
                                                                    ${myApplication?.status === "rejected"
                                                                        ? " text-red-700 border-red-200"
                                                                        : myApplication?.status === "shortlisted"
                                                                            ? " text-green-700 border-green-200"
                                                                            : "bg-gray-100 text-gray-700 border-gray-200"
                                                                    }`
                                                                }
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



                                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                <div className="flex items-center gap-2  text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-xs">Applied recently</span>
                                                </div>
                                                <div
                                                    className={
                                                        `w-2 h-2 rounded-full animate-pulse
                                                        ${myApplication?.status === "rejected"
                                                            ? ""
                                                            : myApplication?.status === "shortlisted"
                                                                ? "bg-green-400"
                                                                : "bg-gray-400"
                                                        }`
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="p-4 bg-green-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <Briefcase className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applied Jobs</h3>
                            <p className="text-gray-500 mb-6">Explore suggested jobs below to test your luck!</p>
                            <div className="w-16 h-1 bg-green-200 rounded-full mx-auto"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* All Jobs Section */}
            <AllJobs jobs={jobs} jobsLoading={jobsLoading} appliedJobsLoading={appliedJobsLoading} />
        </div>
    )
}

export default ListJobs
