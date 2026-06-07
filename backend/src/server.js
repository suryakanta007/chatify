import http from "http";


import app from "./app.js";
import ENV from "./config/config.js";
import connectDB from "./config/db.js";



const server = http.createServer(app);

await connectDB();


server.listen(ENV.PORT,()=>{
    console.log(`Server is listing at http://localhost:${ENV.PORT}`);
})

