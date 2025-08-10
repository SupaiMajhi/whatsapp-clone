import User from "../models/user.model.js";
import { onlineUsers } from "../socket.js";

export const getStatusHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("lastSeen");
    if (!user)
      return res
        .status(404)
        .json({ msgType: "error", message: "user not found" });
    const isOnline = onlineUsers.has(user._id.toString());
    return res.status(200).json({
      msgType: "success",
      data: { status: isOnline, lastSeen: user.lastSeen },
    });
  } catch (error) {
      return res.status(500).json({ msgType: "error", message: `getStatusHandler server error ${error.message}`});
  }
}


export const getAllUserHandler = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json({ 'msgType': 'success', 'data': users });
  } catch (error) {
      return res.status(500).json({ msgType: "error", message: `getAllUserHandler server error ${error.message}`});
  }
}