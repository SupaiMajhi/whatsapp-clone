import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: "dqt7ewqmr",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadProfile = async (data) => {
  const result = await cloudinary.uploader.upload(data.path);
  return result;
};

export const uploadImages = async (data) => {
  const result = [];
  for(const f of data){
    const res = await cloudinary.uploader.upload(f);
    result.push(res.url);
  }
  return result;
}
