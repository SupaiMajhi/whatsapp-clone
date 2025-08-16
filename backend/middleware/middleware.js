import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({ "msgType": "error", "message": "Unauthorized" });

    try {
        let { phone } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let isVerifiedUser = await User.findOne({ phone }).select('-password');
        if(!isVerifiedUser) return res.status(401).json({ "msgType": "error", "message": "Unauthorized" });
        req.user = isVerifiedUser;
        next();
    } catch (e) {
        return res.status(500).json({ "msgType": "error", "message": `Internal server error ${e.message}` });
    }    
}