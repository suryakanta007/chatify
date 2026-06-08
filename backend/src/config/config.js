
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
    NODE_ENV:process.env.NODE_ENV
}

export default ENV