import {Resend} from "resend";
import ENV from "./config.js";
import { createWelcomeEmailTemplate } from "../utils/emailTemplate.js";

const resend = new Resend(ENV.RESEND_API_KEY);

export const sendEmail = async (toEmail,name,clientURL)=>{
    try {
        const {data,error} = await resend.emails.send({
            from:ENV.EMAIL_FROM,
            to:[toEmail],
            subject:"Hello from Chatify",
            html:createWelcomeEmailTemplate(name,clientURL),
            text:`Hello ${name},\n\nWelcome to Chatify!`
        })
        if(error){
            console.log("Email sent Error:",error);
        }
        console.log("Email sent successfully");
        return {data,error}
    } catch (err) {
        throw new Error(err);
    }
}