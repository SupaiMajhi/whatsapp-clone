import mongoose from 'mongoose';


export const connectToDB = () => {
    mongoose
    .connect(process.env.MONGODB_URL)    
    .then(() => console.log('db connected'))
    .catch((e) => console.log(e.message))
}

export const errorResponse = (res, code, message) => {
    res.status(code).json({ 'msgType': 'error', message });
}

export const successfulResponse = (res, code, message, data) => {
    res.status(code).json({ 'msgType': 'success', message, data });
}

export const isValidPhoneNumber = (phone) => {
    // Example regex for a 10-digit number, optionally with country code and separators
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
}

export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}