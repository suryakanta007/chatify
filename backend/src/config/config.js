
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


const ENV = {
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    NODE_ENV:process.env.NODE_ENV,
    JWT_SECERT_KEY:process.env.JWT_SECERT_KEY,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    EMAIL_FROM:process.env.EMAIL_FROM,
    CLIENT_URL:process.env.CLIENT_URL
}

export default ENV