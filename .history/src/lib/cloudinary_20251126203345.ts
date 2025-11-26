import { envs } from "@/config/envs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: envs.cloudinaryCloudName,
  api_key: envs.cloudinaryApiKey,
  api_secret: envs.cloudinaryApiSecret,
  secure: true,
});

export default cloudinary;
