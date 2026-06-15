import {Schema,model }from "mongoose";
import { minLength } from "zod";

const userSchema  = new Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    fullName:{
        type:String,
        required:[true,"Full name is required"],
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});

export const User = model("Users",userSchema);