import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
    try {

        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }


        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }



        const existingUserEmail = await User.findOne({ email })
        if (existingUserEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }


        const existingUserUsername = await User.findOne({ username })
        if (existingUserUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        //increasing the complexity of the password by using 10 rounds 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name, email, username, password: hashedPassword
        })
        await user.save()


        // now will generate a token  payload,secret,options
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })
        res.cookie("jwt-token", token, {
            httpOnly: true, //used to prevent XSS attack 
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",// prevents CSRF attack
            secure: process.env.NODE_ENV === "production", //prevents man in middle attacks
        })
        res.status(200).json({ message: "User registered successfully" })


        //now sending a welcome email to the user 
        //frontend URL
        //in deployment mode it would be actual URL of Unlinked 
        const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;
        try {
            await sendWelcomeEmail(user.email, user.name, profileUrl)
        }
        catch (error) {
            console.log("Error while sending the welcome email", error.message)
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const logout = (req, res) => {
    res.clearCookie("jwt-token")
    res.json({ message: "logout Successfully" })
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create and send token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        await res.cookie("jwt-token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.json({ message: "Logged in successfully" });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};