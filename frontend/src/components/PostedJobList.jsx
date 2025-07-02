import { Briefcase } from "lucide-react";
import PostedJobCard from "./PostedJobCard";

const PostedJobsList = ({
    postedJobs,
    postedJobsLoading,
    user,
    getStatusBadge,
    onUpdateStatus,
    onShowJobModal,
}) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-[#333639] px-8 py-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                   <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Your Posted Jobs</h2>
                    <p className="text-blue-100">Manage and track your job postings</p>
                </div>
            </div>
        </div>
        <div className="p-8">
            {postedJobsLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600 font-medium">Loading your jobs...</span>
                    </div>
                </div>
            ) : postedJobs && postedJobs.length > 0 ? (
                <div className="space-y-8">
                    <button
                        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={onShowJobModal}
                    >
                        Post Job
                    </button>
                    {postedJobs.map((job) => (
                        <PostedJobCard
                            key={job._id}
                            job={job}
                            user={user}
                            getStatusBadge={getStatusBadge}
                            onUpdateStatus={onUpdateStatus}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="p-4 bg-blue-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-blue-500"><use href="#briefcase" /></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
                    <p className="text-gray-500 mb-6">
                        Start by posting your first job to attract talented candidates
                    </p>
                    <button
                        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={onShowJobModal}
                    >
                        Post Job
                    </button>
                </div>
            )}
        </div>
    </div>
);

export default PostedJobsList;