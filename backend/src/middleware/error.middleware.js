import { ApiError } from "../utils/apiError.js"
import { HTTP_STATUS } from "../utils/statusCode.js"
import ENV from "../config/config.js";


const errorMiddleware = (err,req,res,next)=>{
    if(ENV.NODE_ENV === "development"){
        console.log(err);
    }
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR,err));
}

export default errorMiddleware