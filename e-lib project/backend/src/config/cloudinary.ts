import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});

const cloudinary_upload = async (url: string) => {
  try {
    return await cloudinary.uploader.upload(url, { resource_type: "image" });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default cloudinary_upload;
