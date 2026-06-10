import bcrypt from "bcryptjs"

import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { HTTP_STATUS } from "../utils/statusCode.js";
import * as authValidator from "../validators/auth.validator.js"
import { generateToken } from "../utils/token.js";
import ENV from "../config/config.js";
import { sendEmail } from "../config/mail.js";


export const register = asyncHandler(async (req, res, next) => {
    const validation = authValidator.redisterSchema.safeParse(req.body);
    if (!validation.success) {
        //! To extrat the issues for Zod validation
        const zodErrors = validation.error
        let zodAllIssues = []
        let firstIssue;
        if (zodErrors?.issues && Array.isArray(zodErrors.issues)) {
            zodAllIssues = zodErrors.issues.map((issue) => ({
                field: issue.path ? issue.path.join(".") : "unknown",
                message: issue.message || "Validation Error",
                code: issue.code
            }))
        }
        firstIssue = zodAllIssues[0]?.message || "Validation Error"
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(HTTP_STATUS.BAD_REQUEST, null, firstIssue))
    }
    const { fullName, email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return res.status(HTTP_STATUS.CONFLICT).json(new ApiResponse(HTTP_STATUS.CONFLICT, null, "User already exist"));
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword
    })

    if (!newUser) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(new ApiResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, null, "Something went wrong"));
    }

    const token = await generateToken(newUser._id);
    res.cookie("authToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "production",
    });

    const userData = {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
    }

    const {data,error} = await sendEmail(newUser.email,newUser.fullName,ENV.CLIENT_URL);

    return res.status(HTTP_STATUS.CREATED).json(new ApiResponse(HTTP_STATUS.CREATED, userData, "User created successfully"));

})
export const login = asyncHandler(async (req, res, next) => {
    const validation = authValidator.loginSchema.safeParse(req.body);
    if(!validation.success){
        const zodErrors = validation.error
        let zodAllIssues = []
        let firstIssue;
        if (zodErrors?.issues && Array.isArray(zodErrors.issues)) {
            zodAllIssues = zodErrors.issues.map((issue) => ({
                field: issue.path ? issue.path.join(".") : "unknown",
                message: issue.message || "Validation Error",
                code: issue.code
            }))
        }
        firstIssue = zodAllIssues[0]?.message || "Validation Error"
        return res.status(HTTP_STATUS.BAD_REQUEST).json(new ApiResponse(HTTP_STATUS.BAD_REQUEST, null, firstIssue))
    }

    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.status(HTTP_STATUS.NOT_FOUND).json(new ApiResponse(HTTP_STATUS.NOT_FOUND,null,"User not found"));
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(new ApiResponse(HTTP_STATUS.UNAUTHORIZED,null,"Invalid credentials"));
    }

    const token = await generateToken(user._id);
    res.cookie("authToken", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "production",
    });

    const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
    }

    return res.status(HTTP_STATUS.ACCEPTED).json(new ApiResponse(HTTP_STATUS.ACCEPTED,userData,"User logged in successfully"));

})

export const logout = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "THis is logout controller" })
})


