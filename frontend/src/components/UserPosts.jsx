import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import Post from "./Post";
import { ChevronDown, ChevronUp } from "lucide-react";

const UserPosts = ({ username }) => {
    const [expanded, setExpanded] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ["userPosts", username],
        queryFn: () => axiosInstance.get(`/posts/user/${username}`),
    });

    const posts = data?.data?.posts || [];

    return (
        <div className="bg-white rounded-lg shadow p-4 mt-8">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(e => !e)}>
                <h2 className="text-xl font-semibold">
                    Posts <span className="text-gray-500 text-base">({posts.length})</span>
                </h2>
                {expanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
            </div>
            {expanded && (
                <div className="mt-4 transition-all duration-300">
                    {isLoading && <div>Loading posts...</div>}
                    {error && <div className="text-red-500">Failed to load posts.</div>}
                    {!isLoading && !error && posts.length === 0 && (
                        <div className="text-gray-500">No posts yet.</div>
                    )}
                    {!isLoading && !error && posts.length > 0 && (
                        <div className="space-y-4">
                            {posts.map(post => (
                                <Post key={post._id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserPosts;