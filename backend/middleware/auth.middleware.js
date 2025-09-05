import { errorResponse } from "../lib/lib.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cookie from 'cookie';

const authMiddleware = async (req, res, next) => {
    const { token } = cookie.parse(req.headers.cookie);
    if(!token) return errorResponse(res, 401, 'unauthorized');
    try {
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!isVerified) return errorResponse(res, 401, "unauthorized");
        const user = await User.findOne({ phone: isVerified });
        if (!user) return errorResponse(res, 401, "unauthorized");
        req.user = user;
        next();
    } catch (error) {
        console.log('authMiddleware Error', error.message);
        return errorResponse(res, 500, 'Internal server error');
    }
}

export default authMiddleware;