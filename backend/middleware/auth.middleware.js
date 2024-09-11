import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


export const protectRoute = async (req, res, next) => {
    try {
        //some validations on token and cookie
        const token = req.cookies["jwt-token"]

        if (!token) {
            return res.status(401).json({ message: 'Not Authorized' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid  Token' })
        }
        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(401).json({ message: 'User not Found ' })
        }
        req.user = user

        next()

    }
    catch (error) {
        console.log('Error in Auth Middleware', error.message)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
