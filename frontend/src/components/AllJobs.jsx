import { Briefcase } from 'lucide-react'
import JobCard from './JobCard'
 
const AllJobs = ({ jobs, jobsLoading, appliedJobs}) => {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-[#333639] px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">All Jobs</h2>
                            <p className="text-blue-100">Discover new opportunities</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {jobsLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="text-gray-600 font-medium">Loading jobs...</span>
                            </div>
                        </div>
                    ) : jobs && jobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {jobs
                                .filter((job) => !appliedJobs?.some((applied) => applied._id === job._id))
                                .map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="p-4 bg-blue-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <Briefcase className="w-10 h-10 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                            <p className="text-gray-500">Check back later for new opportunities</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AllJobs
