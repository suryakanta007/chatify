import { ApiError } from "../utils/apiError.js"
import { HTTP_STATUS } from "../utils/statusCode.js"


const errorMiddleware = (err,req,res,next)=>{
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR,err.message));
}

export default errorMiddleware