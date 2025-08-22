import User from "../models/user.model.js";
import { onlineUsers } from "../socket.js";
import uploadOnCloudinary from "../util/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

export const getStatusHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("lastSeen");
    if (!user) return res.status(404).json({ msgType: "error", message: "user not found" });
    const isOnline = onlineUsers.has(user._id.toString());
    return res.status(200).json({
      msgType: "success",
      data: { isOnline, lastSeen: user.lastSeen },
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

export const updateAvatarHandler = async (req, res) => {
  if(!req.file) return res.status(400).json({ msgType: "error", message: 'provide a photo' });
  try {
    const uploadResult = await uploadOnCloudinary(req.file.path);
    const updateResponse = await User.findByIdAndUpdate(req.user.id, { profilePic: uploadResult }, {returnDocument: 'after'});
    return res.status(200).json({ msgType: 'success', message: 'updated successfully', data: updateResponse.profilePic });
  } catch (error) {
    return res.status(500).json({ msgType: "error", message: `updateAvatarHandler server error ${error.message}`});
  }
}


export const deleteAvatarHandler = async (req, res) => {
  if(!req.file) return res.status(400).json({ msgType: "error", message: 'upload a photo first' });
  try {
    const user = await User.findById(req.user.id);
    if(!user || !user.profilePic) return res.status(401).json({ msgType: "error", message: 'unauthorized or has no profile' });

    //destroy the file from the cloudinary
    await cloudinary.uploader.destroy(user.profilePic.public_id);
    user.profilePic = null;
    await user.save();
    return res.status(200).json({ msgType: 'success', message: 'deleted successfully', data: user.profilePic });
  } catch (error) {
    return res.status(500).json({ msgType: "error", message: `updateAvatarHandler server error ${error.message}`});
  }
}