import jwt from "jsonwebtoken";
import ENV from "../config/config.js"

export const generateToken = async (userId)=>{
    const token = await jwt.sign({id:userId},ENV.JWT_SECERT_KEY,{expiresIn:"3d"});
    return token
}


export const verifyToken = async(token)=>{
    const decode = await jwt.verify(token,ENV.JWT_SECERT_KEY);
    return decode?.id
}
