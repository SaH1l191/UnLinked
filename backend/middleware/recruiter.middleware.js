export const recruiterRoute = (req, res, next) => {
    if (req.user.role !== "recruiter") {
        return res.status(403).json({ message: "Only recruiters can perform this action" });
    }
    next();
};