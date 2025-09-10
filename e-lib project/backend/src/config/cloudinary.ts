import { v2 as cloudinary } from "cloudinary";
import config from "./config.js";
import fs from "node:fs/promises";

type resourceType = "image" | "video" | "raw" | "auto" | undefined;

type folderType = "book_pdfs" | "cover_images" | "avatars";

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});

const cloudinary_upload = async (
  url: string,
  resource_type: resourceType,
  folder: folderType
) => {
  try {
    const response = await cloudinary.uploader.upload(url, {
      resource_type: resource_type,
      folder: folder,
    });
    await fs.unlink(url);
    return response;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// delete cloudinary previous files

export const deleteCloudinary = (public_id: string) => {
  try {
    return cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log(error);
  }
};

// to delete raw files from cloudinary

export const deleteCloudinaryRawFiles = (public_id: string) => {
  try {
    return cloudinary.api.delete_resources([public_id], {
      resource_type: "raw",
    });
  } catch (error) {
    console.log(error);
  }
};

export default cloudinary_upload;
