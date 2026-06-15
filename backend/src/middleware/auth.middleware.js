import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../utils/statusCode.js";
import { verifyToken } from "../utils/token.js";

export const checkAuth = asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.authToken;
    if(!token){
        res.status(HTTP_STATUS.UNAUTHORIZED).json(new ApiResponse(HTTP_STATUS.UNAUTHORIZED,null,"Unauthorized"));
    }

    const userId = await verifyToken(token);
    if(!userId){
        res.status(HTTP_STATUS.UNAUTHORIZED).json(new ApiResponse(HTTP_STATUS.UNAUTHORIZED,null,"Unauthorized"));
    }

    const user = await User.findById(userId);
    if(!user){
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(new ApiResponse(HTTP_STATUS.UNAUTHORIZED,null,"Unauthorized"));
    }

    req.user = user;
    next();
})

