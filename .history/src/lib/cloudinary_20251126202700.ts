import { envs } from "@/config/envs";
import { v2 as cloudinary } from "cloudinary";

console.log(envs.cloudinaryCloudName);
console.log(envs.cloudinaryApiKey);
console.log(envs.cloudinaryApiSecret);

cloudinary.config({
  cloud_name: envs.cloudinaryCloudName,
  api_key: envs.cloudinaryApiKey,
  api_secret: envs.cloudinaryApiSecret,
  secure: true,
});
