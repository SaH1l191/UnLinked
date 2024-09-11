import Post from "../models/post.model.js";
import cloudinary from '../lib/cloudinary.js'
import Notification from "../models/notification.model.js";
import { sendCommentNotificationEmail } from "../emails/emailHandlers.js";

export const getFeedPosts = async (req, res) => {
    try {
        //we need additional details of the user who posted ie its name , 
        const posts = await Post.find({ author: { $in: req.user.connections } })
            .populate("author", "name headline profileProfile username")
            //going under the author of the post and populating the author of post ,name ,profilePicture
            .populate("comments.user", "name profilePicture").sort({ createdAt: -1 })
        //going under comments.user and populating that users name profilePicture +latest post first

        res.status(200).json({ posts })


    }
    catch (error) {
        console.log("Error in Get Feed Posts Controller = > ", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const createPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        let newPost;
        if (image) {
            const imgResult = await cloudinary.uploader.upload(image)
            newPost = new Post({
                author: req.user._id,
                content,
                image: imgResult
            })
        } else {
            newPost = new Post({
                author: req.user._id,
                content
            })
        }
        await newPost.save()
        res.status(201).json(newPost)

    }
    catch (error) {
        console.log("Error in Create Post Controller = > ", error);

        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deletePost = async (req, res) => {
    //check if the user is deleting his post or any other user's post 
    try {
        const postId = req.params.id
        const userId = req.user._id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not allowed to delete this post" })
        }

        if (post.image) {
            //the image url stored in db wil be of form 
            // https://res.cloudinary.com/dvhrffmdi/image/upload/v1725425863/1fgm5mkjztbwummahizv.png
            // deleting the image from the post 
            await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0])
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully!" })
    }
    catch (error) {
        console.log("Error in Delete Post Controller = > ", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
            .populate("author", "name username profilePicture headline")
            .populate("comments.user", "name profilePicture ")

        res.status(200).json(post)
    }
    catch (error) {
        console.log("Error in Get Post By Id Controller = > ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;

        //we need to update the corresponding post 
        const post = await Post.findByIdAndUpdate(postId,
            {
                $push: {
                    comments: {
                        user: req.user._id,
                        content
                    }
                }
            },
            { new: true }
        )
            .populate("author", "name username profilePicture headline")

        //notify the author of the post that someone commented on his post
        //but also check that notification is not sent when the author itself is commenting 
        //on his post 
        if (post.author._id.toString() !== req.user._id.toString()) {
            const newNotification = new Notification({
                recipient: post.author,
                type: "comment",
                relatedUser: req.user._id,
                relatedPost: postId,
            });

            await newNotification.save();


            //now send a corresponding email to the author of the post regarding the comment done on post 
            try {
                const postUrl = process.env.CLIENT_URL + "/post/" + postId
                await sendCommentNotificationEmail(
                    post.author.email,
                    post.author.name,
                    req.user.name,
                    postUrl,
                    content
                );
            }
            catch (error) {
                console.log("Error in sending comment notification email:", error.message);
            }
        }


        res.status(200).json(post);
    }
    catch (error) {
        console.log("Error in Create Comment Controller = > ", error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const post = await Post.findById(postId)
        //if like is already present then unlike it 
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString())
        }
        else {
            post.likes.push(userId)
        }

        //create  notification if the post owner is not the user who liked
        if (post.author.toString() !== userId.toString()) {
            const newNotification = new Notification({
                recipient: post.author,
                type: "like",
                relatedUser: userId,
                relatedPost: postId,
            });

            await newNotification.save();
        }

    }
    catch (error) {
        console.log("Error in Like Post Controller = > ", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}