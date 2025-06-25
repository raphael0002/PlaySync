import { verifyToken } from "../utils/auth.utils.js";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Verify JWT and decode payload
        const decoded = verifyToken(token, process.env.JWT_SECRET);

        // Assign partner_id from JWT to request body
        req.body.partner_id = decoded.userId; //id of the user is the partner id for the venue

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export default isAuthenticated;