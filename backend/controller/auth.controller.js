import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateCookie, hashPassword } from "../util/util.js";


export const loginHandler = async (req, res) => {
    const { phone, password } = req.body;
    
    if(!phone || !password) return res.status(401).json({ "msgType": "error", "message": "All fields are required" });
    try {
        const user = await User.findOne({ phone });
        if(!user) return res.status(401).json({ "msgType": "error", "message": "invalid username or password" });
        //compare the password
        const isPassSame = await bcrypt.compare(password, user.password);
        //if not same
        if(!isPassSame) return res.status(401).json({ "msgType": "error", "message": "invalid username or password" });
        //generate a cookie
        const cookie = generateCookie(phone);
        res.cookie("token", cookie, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(200).json({ "msgType": "success", "message": "Login successfull", "data": { "_id": user._id, "phone": user.phone, "username": user.username }});
    } catch (e) {
        return res.status(500).json({ "msgType": "error", "message": `server is not working ${e.message}` });
    }
}


export const signUpHandler = async (req, res) => {
    const { username, password, phone } = req.body;

    if(!username || !phone || !password) return res.status(401).json({ "msgType": "error", "message": "All fields are required" });

    try {
        const isAlreadyExist = await User.findOne({ phone });
        if(isAlreadyExist) return res.status(400).json({ "msgType": "error", "message": "username already exist" });

        let hashedPassword = await hashPassword(password);
        const user = new User({
            username,
            password: hashedPassword,
            phone
        });
        await user.save();
        return res.status(201).json({ "msgType": "success", "message": "user is created" });
    } catch (e) {
        return res.status(500).json({ "msgType": "error", "message": `server is not working ${e.message}` });
    }
}

export const logoutHandler = async (req, res) => {
    try {
        res.cookie('token', '',{
            maxAge: 0,
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        return res.status(200).json({ 'msgType': 'success', 'message': 'Logout Successfully'});
    } catch (error) {
        return res.status(500).json({ 'msgType': 'error', 'message': `Internal server error LogoutHandler ${error.message}`});
    }
}

export const checkAuthHandler = (req, res) => {
    return res.status(200).json({"msgType": "success", "data": req.user });
}