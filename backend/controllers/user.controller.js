import { errorResponse, successfulResponse } from "../lib/lib.js";
import User from "../models/user.model.js";
import { onlineUser } from "../socket.js";

export const getAllUsersHandler = async (req, res) => {
    const signinId = req.user.id;
    if(!signinId) return errorResponse(res, 400, 'unable to fetch. please try again');
    try {
        const users = await User.find({ _id: { $ne: signinId }}).select('-password')
        return successfulResponse(res, 200, 'successful', users);
    } catch (error) {
        console.log('getAllUsersHandler Error', error.message);
        return errorResponse(res, 500, 'Internal server error');
    }
}

export const getUserStatus = async (req, res) => {
    const { userId } = req.params;
    try {
        if(onlineUser.has(userId)){
            return successfulResponse(res, 200, 'successful', { isOnline: true });
        }
        const { lastSeen } = await User.findById(userId);
        return successfulResponse(res, 200, 'successful', { isOnline: false, lastSeen });
    } catch (error) {
        console.log('getAllUsersHandler Error', error.message);
        return errorResponse(res, 500, 'Internal server error');
    }
}