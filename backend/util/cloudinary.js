import { v2 as cloudinary } from "cloudinary";

//configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFile) => {
    const uploadResult = await cloudinary.uploader.upload(localFile);
    console.log(uploadResult);
}

export default uploadOnCloudinary;