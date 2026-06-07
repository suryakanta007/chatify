import {connect} from "mongoose";
import ENV from "./config.js";


const connectDB = async ()=>{
    try {
        await connect(ENV.MONGODB_URI);
        console.log("DB connected");
    } catch (error) {
        throw new Error("DB connection error :"+error);
        process.exit(1);
    }
}

export default connectDB;