import http from "http";
import path from "path";
import express from "express";


import app from "./app.js";
import ENV from "./config/config.js";
import connectDB from "./config/db.js";




const server = http.createServer(app);
const _dirname = path.resolve();

// make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")))

    app.get("*",(_,res)=>{
        res.sendFile(path.join(_dirname,"../frontend/dist/index.html"))
    })
}



await connectDB();


server.listen(ENV.PORT,()=>{
    console.log(`Server is listing at http://localhost:${ENV.PORT}`);
})

