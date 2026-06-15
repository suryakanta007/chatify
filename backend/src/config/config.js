
import {config} from "dotenv";
config();
if(!process.env.PORT){
    console.log("PORT not found");
    process.exit(1);
}

if(!process.env.MONGODB_URI){
    console.log("MONGODB_URI not found");
    process.exit(1);
}

if(!process.env.NODE_ENV){
    console.log("NODE_ENV not found");
    process.exit(1);
}

if(!process.env.JWT_SECERT_KEY){
    console.log("JWT_SECERT_KEY not found");
    process.exit(1);
}

if(!process.env.RESEND_API_KEY){
    console.log("RESEND_API_KEY not found");
    process.exit(1);
}

if(!process.env.EMAIL_FROM){
    console.log("EMAIL_FROM not found");
    process.exit(1);
}

if(!process.env.CLIENT_URL){
    console.log("CLIENT_URL not found");
    process.exit(1);
}

if(!process.env.CLOUDINARY_API_KEY){
    console.log("CLOUDINARY_API_KEY not found");
    process.exit(1);
}

if(!process.env.CLOUDINARY_API_SECRET){
    console.log("CLOUDINARY_API_SECRET not found");
    process.exit(1);
}

if(!process.env.CLOUDINARY_CLOUD_NAME){
    console.log("CLOUDINARY_CLOUD_NAME not found");
    process.exit(1);        
}




const ENV = {
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    NODE_ENV:process.env.NODE_ENV,
    JWT_SECERT_KEY:process.env.JWT_SECERT_KEY,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    EMAIL_FROM:process.env.EMAIL_FROM,
    CLIENT_URL:process.env.CLIENT_URL,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME
}

export default ENV