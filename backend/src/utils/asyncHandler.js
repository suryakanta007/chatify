

export const asyncHandler= (requestHandler)=>{
    return async (req,res,next)=>{
        try {
            await requestHandler(req,res,next)
        } catch (error) {
            res.status(500).json({err:error.mssage})
        }
    }
}



