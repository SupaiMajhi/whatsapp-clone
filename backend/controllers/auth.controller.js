import { errorResponse, generateOtp, successfulResponse } from "../lib/lib.js";
import { isValidPhoneNumber } from "../lib/lib.js";
import Otp from "../models/otp.model.js";
import bcrypt from 'bcrypt';

export const getOtpHandler = async (req, res) => {
    const { phone } = req.body;
    if(!phone || !isValidPhoneNumber(phone)) return errorResponse(res, 404, 'Please provide valid phone number')
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
    } catch (error) {
        console.log('getOtpHandler error', error.message);
        errorResponse(res, 500, `Internal server error ${error.message}`);        
    }
}