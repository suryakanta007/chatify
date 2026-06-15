import {v2 as cloudinary} from "cloudinary";
import ENV from "./config.js";
import { th } from "zod/v4/locales";

cloudinary.config({
    cloud_name:ENV.CLOUDINARY_CLOUD_NAME,
    api_key:ENV.CLOUDINARY_API_KEY,
    api_secret:ENV.CLOUDINARY_API_SECRET
})

// export const uploardOnClouinary = async (filePath)=>{
//     try {
//         const response = await cloudinary.uploader.upload(filePath,{
//             resource_type:"auto",
//         })

//         console.log("File is uploaded un Cloudinary");
//         return response;
        
//     } catch (error) {
//         throw new Error("Error from cloudinary..",error);
//     }
// }

export {cloudinary}




