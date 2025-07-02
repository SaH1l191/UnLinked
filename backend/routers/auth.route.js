import express  from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import passport from "passport";
import "../utils/google-auth.js";
import jwt from 'jsonwebtoken'

const router = express.Router();


 
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get("/me", protectRoute, getCurrentUser);

 
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/login",
    session: false,
  }),
  (req, res) => {
    // Generate JWT and set cookie as in your normal login
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    res.cookie("jwt-token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect(process.env.CLIENT_URL + "/"); // Redirect to frontend home
  }
);

export default router;

