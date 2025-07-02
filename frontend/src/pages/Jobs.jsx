import { axiosInstance } from "../lib/axios"
import Sidebar from "../components/Sidebar"
import ListJobs from "../components/ListJobs"
import { Users, Briefcase, Clock, MapPin } from "lucide-react"
import toast from "react-hot-toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import JobModal from "../components/JobModal";
import { useState } from "react";
import PostedJobsList from "../components/PostedJobList"
import AllJobs from "../components/AllJobs"

const Jobs = () => {
    const { data: user } = useQuery({ queryKey: ["authUser"] })
    const queryClient = useQueryClient()
    const [showJobModal, setShowJobModal] = useState(false);
    const { data: postedJobs, isLoading: postedJobsLoading } = useQuery({
        queryKey: ["postedJobs"],
        queryFn: async () => {
            if (user?.role === "recruiter") {
                const res = await axiosInstance.get("/jobs/posted/me")
                return res.data
            }
            return []
        },
        enabled: user?.role === "recruiter",
    })

    // FIXED: useMutation with object syntax and mutationFn property
    const updateStatusMutation = useMutation({
        mutationFn: async ({ jobId, userId, status }) =>
            axiosInstance.put(`/jobs/${jobId}/applicant/${userId}/status`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["postedJobs"] });
            queryClient.invalidateQueries({ queryKey: ["appliedJobs"] });
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            toast.success("Status updated successfully")
        },
        onError: () => {
            toast.error("Error updating status")
        },
    })

    // FIXED: onUpdateStatus uses correct argument structure
    const onUpdateStatus = (jobId, userId, status) => {
        updateStatusMutation.mutate({ jobId, userId, status })
        //appliedJobs
        queryClient.invalidateQueries({ queryKey: ["appliedJobs"] });
    }

    const getStatusBadge = (status) => {
        const statusStyles = {
            // "pending", "shortlisted", "rejected"
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            shortlisted: "bg-green-100 text-green-800 border-green-200",
            rejected: "bg-red-100 text-red-800 border-red-200",
            // reviewed: "bg-blue-100 text-blue-800 border-blue-200",
        }

        return statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"
    }

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="col-span-1 lg:col-span-1">
                        <div className="sticky top-6">
                            <Sidebar user={user} />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-3">
                        <div className="space-y-8">
                            {user?.role === "recruiter" ? (
                                <>
                                    <PostedJobsList
                                        postedJobs={postedJobs}
                                        postedJobsLoading={postedJobsLoading}
                                        user={user}
                                        getStatusBadge={getStatusBadge}
                                        onUpdateStatus={onUpdateStatus}
                                        onShowJobModal={() => setShowJobModal(true)} />
                                    <div className="mt-6">
                                        <AllJobs />
                                    </div>
                                </>

                            ) : (
                                <ListJobs />
                            )}
                        </div>


                    </div>
                </div>


            </div>
            {showJobModal && (
                <JobModal
                    onClose={() => setShowJobModal(false)}
                    onSuccess={() => queryClient.invalidateQueries({ queryKey: ["postedJobs"] })}
                />
            )}

        </div>
    )
}

export default Jobs
