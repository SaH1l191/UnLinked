import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";


export const getSuggestedConnections = async (req, res) => {
    try {
        //we want to fetch all the random suggested connections 
        // should not include ourselves and the already connected users

        console.log("logging req.user => ",req.user)
        const currentUser = await User.findById(req.user._id).select("connections")

        const suggestedConnections = await User.find({
            _id: {
                $ne: req.user._id,
                $nin: currentUser.connections
            }
        }).select("name username profilePicture headline").limit(3)
        res.json(suggestedConnections)
    }
    catch (error) {
        console.log('Error: ', error);
        return res.status(400).json({ message: 'Something went wrong' })
    }
}

export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password")
        //we dont want to send password of the user to client side 
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }


    }
    catch (error) {
        console.log('Error in getPublicProfile: ', error);
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "name", "headline", "about", "profilePicture", "location", "bannerImg", "skills",
            "experience", "education"
        ]
        const updatedData = {}

        for (const field of allowedFields) {
            if (req.body[field]) {
                updatedData[field] = req.body[field]
            }
        }
        if (req.body.profilePicture) {
            const result = await cloudinary.uploader.upload(req.body.profilePicture)
            updatedData.profilePicture = result.secure_url
        }
        if (req.body.bannerImg) {
            const result = await cloudinary.uploader.upload(req.body.bannerImg)
            updatedData.bannerImg = result.secure_url
        }

        const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select("-password")
        res.json(user)
    }
    catch (error) {
        console.log('Error in updateProfile: ', error);
        return res.status(500).json({ message: 'Something went wrong' })
    }
}