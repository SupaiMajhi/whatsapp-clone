import { errorResponse, generateOtp, successfulResponse } from "../lib/lib.js";
import { isValidPhoneNumber, hashedPassword, generateToken } from "../lib/lib.js";
import Otp from "../models/otp.model.js";
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";


export const sendOtpHandler = async (req, res) => {
    const { phone } = req.body;
    if(!phone || !isValidPhoneNumber(phone)) return errorResponse(res, 400, 'Please provide valid phone number')
    try {
        const otp = generateOtp();
        const hashedOtp = bcrypt.hash(otp, 10);
        const newOtp = new Otp({
            phone,
            otp: hashedOtp,
            otpExpiry: Date.now() + 2 * 60 * 1000 //todo: make less than 30 seconds
        });
        await newOtp.save();
        //send otp
        return successfulResponse(res, 200, 'sent successfully.');
    } catch (error) {
        console.log('getOtpHandler error', error.message);
        return errorResponse(res, 500, `Internal server error ${error.message}`);     
    }
}

export const loginHandler = async (req, res) => {
    const { phone, password } = req.body;
    try {
        if(!phone || !password) return errorResponse(res, 400, 'all fields are required');
        
        //check if user already exist or not
        const alreadyExist = await User.findOne({ phone });
        if(!alreadyExist) return errorResponse(res, 401, 'phone or password is incorrect');

        //check if the password is same or not
        const isPasswordSame = bcrypt.compare(password, alreadyExist.password);
        if(!isPasswordSame) {
            return errorResponse(res, 401, 'phone or password is incorrect')
        }
        //token generated and send to the user
        const token = await generateToken(alreadyExist.phone);
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "strict",
          });
        return successfulResponse(res, 200, 'login successful.'); 
    } catch (e){
        console.log('loginHandler error', error.message)
        return errorResponse(res, 500, 'Internal server error.');
    }
}

export const signupHandler = async (req, res) => {
    const { phone, username, password } = req.body;
    try {
        if(!phone || !username || !password) return errorResponse(res, 400, 'all fields are required.');
        const alreadyExist = await User.findOne({ phone });
        if(alreadyExist) return errorResponse(res, 400, 'phone already exist.');
        const hash = await hashedPassword(password);
        const newUser = new User({
            phone,
            username,
            password: hash
        });
        await newUser.save();
        return successfulResponse(res, 201, 'created successfully.');
    } catch (e){
        console.log('signupHandler error', error.message)
        return errorResponse(res, 500, 'Internal server error.');
    }
}