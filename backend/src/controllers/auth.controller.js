import { asyncHandler } from "../utils/asyncHandler.js"

    
    export const  register = asyncHandler(async (req,res,next)=>{
       return res.status(200).json({message:"THis is register controller"})
    })
    export const login  = asyncHandler(async (req,res,next)=>{
        res.status(200).json({message:"THis is login controller"})
    })

    export const logout = asyncHandler(async (req,res,next)=>{
        res.status(200).json({message:"THis is logout controller"})
    })


