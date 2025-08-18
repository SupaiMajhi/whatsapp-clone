import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import { unlink } from 'fs/promises';
configDotenv();
//configuration
console.log(process.env.CLOUDINARY_API_KEY);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFile) => {
    console.log(localFile)
    if(!localFile) return null;
    try {
        const uploadResult = await cloudinary.uploader.upload(localFile);
        await unlink(localFile);
        console.log('cloudinary result', uploadResult);
        return uploadResult;
    } catch (error) {
        console.log('uploadOnCloudinary error ', error.message);
        return null;
    }
}

export default uploadOnCloudinary;