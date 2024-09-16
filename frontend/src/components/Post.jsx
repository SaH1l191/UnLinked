import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../lib/axios';
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
import PostAction from './PostAction';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
const Post = ({ post }) => {


  const { postId } = useParams()
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const isOwner = authUser._id === post.author._id;
  const isLiked = post.likes.includes(authUser._id);
  //collapse section display logic
  const [showComments, setShowComments] = useState(false);
  //for commenting on the post
  const [newComment, setNewComment] = useState("");
  //for showing the commments 
  const [comments, setComments] = useState(post.comments || []);

  const queryClient = useQueryClient();

  //forr deleting the post logic 
  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      //refetch the post again  to show the updated status of post
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  //for adding a comment
  const { mutate: createComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/posts/${post._id}/comment`, {
        content: newComment,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to add comment");
    },
  })

  //for liking the post logic
  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/posts/${post._id}/like")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to add comment");
    },
  })

  const handleDeletePost = () => {
    if (!window.confirm(`Are you sure to delete this post?`)) return
    deletePost();
  }

  const handleLikePost = async () => {
    if (isLikingPost) return;
    likePost();
  };

  //no empty comment should be done 
  const handleAddComment = async (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			createComment(newComment);
			setNewComment("");
			setComments([
				...comments,
				{
					content: newComment,
					user: {
						_id: authUser._id,
						name: authUser.name,
						profilePicture: authUser.profilePicture,
					},
					createdAt: new Date(),
				},
			]);
		}
	};



  return (
    <div className='mb-4 rounded-lg shadow bg-secondary'>
      <div className='p-4'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <Link to={`/profile/${post?.author?.username}`}>
              <img
                src={post.author.profilePicture || "/avatar.png"}
                alt={post.author.name}
                className='mr-3 rounded-full size-10'
              />
            </Link>
            <div>
              <Link to={`/profile/${post?.author?.username}`}>
                <h3 className='font-semibold'>{post.author.name}</h3>
              </Link>
              <p className='text-xs text-info'>{post.author.headline}</p>
              <p className='text-xs text-info'>
                {/* summix means ... days ago somehting liek tat  */}
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {
            isOwner && (
              <button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
              </button>
            )
          }

        </div>

        <p>{post.content}</p>
        {post.image && <img src={post.image} alt='Post content' className='w-full mb-4 rounded-lg' />}

        <div className='flex justify-between text-info'>
          <PostAction
            icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
            text={`Like (${post.likes.length})`}
            onClick={handleLikePost}
          />

          <PostAction
            icon={<MessageCircle size={18} />}
            text={`Comment (${comments.length})`}
            onClick={() => setShowComments(!showComments)}
          />
          <PostAction icon={<Share2 size={18} />} text='Share' />
        </div>

      </div>

      {
        showComments && (
          <div className='px-4 pb-4'>
            <div className='overflow-y-auto max-h-60'>
              {
                comments.map((comment) => (
                  <div key={comment._id} className='flex items-start p-2 mb-2 rounded bg-base-100'>
                    <img
                      src={comment.user.profilePicture || "/avatar.png"}
                      alt={comment.user.name}
                      className='flex-shrink-0 w-8 h-8 mr-2 rounded-full'
                    />
                    <div className='flex-grow'>
                      <div className='flex items-center mb-1'>
                        <span className='mr-2 font-semibold'>{comment.user.name}</span>
                        <span className='text-xs text-info'>
                          {formatDistanceToNow(new Date(comment.createdAt))}
                        </span>
                      </div>
                      <p>{comment.content}</p>
                    </div>

                  </div>


                ))}
              <form onSubmit={handleAddComment} className='flex items-center'>
                <input
                  type='text'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Add a comment...'
                  className='flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary'
                />
                <button
                  type='submit'
                  className='p-2 text-white transition duration-300 rounded-r-full bg-primary hover:bg-primary-dark'
                  disabled={isAddingComment}
                >
                  {isAddingComment ? <Loader size={18} className='animate-spin' /> : <Send size={18} />}
                </button>

              </form>
            </div>
          </div>
        )
      }



    </div>
  )
}

export default Post