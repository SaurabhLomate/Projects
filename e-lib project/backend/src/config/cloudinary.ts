import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";
import fs from "node:fs/promises";

type resourceType = "image" | "video" | "raw" | "auto" | undefined;

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});

const cloudinary_upload = async (url: string, resource_type: resourceType) => {
  try {
    const response = await cloudinary.uploader.upload(url, {
      resource_type: resource_type,
    });
    await fs.unlink(url);
    return response;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default cloudinary_upload;
