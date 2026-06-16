import aj from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { HTTP_STATUS } from "../utils/statusCode.js"
import {ApiResponse} from "../utils/apiResponse.js"


export const arcjectProtection = async(req,res,next)=>{
    try {
        const decision = await aj.protect(req);
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json(new ApiResponse(HTTP_STATUS.TOO_MANY_REQUESTS,null,"Rate Limit exceeded,Please try again later"));
            }else if(decision.reason.isBot()){
                return res.status(HTTP_STATUS.UNAUTHORIZED).json(new ApiResponse(HTTP_STATUS.UNAUTHORIZED,null,"Bot activity detected"));
            }else{  
                return res.status(HTTP_STATUS.FORBIDDEN).json(new ApiResponse(HTTP_STATUS.FORBIDDEN,null,"Access denied for security reasons"));
            }
        }

        if(decision.results.some(isSpoofedBot)){
            return res.status(HTTP_STATUS.FORBIDDEN).json(new ApiResponse(HTTP_STATUS.FORBIDDEN,null,"Malicious bot activity detected"));
        }
        next()
    } catch (error) {
        console.log("Arject protection error:",error); 
        next()
    }
}