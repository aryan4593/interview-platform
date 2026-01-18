import express from "express"
import path, { dirname } from "path"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();


//Make this app deployment ready
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend/dist"));
    })
}

app.get("/health", (req, res)=>{
    res.status(200).json({msg:"API is up and running"});
});
app.get("/books", (req, res)=>{
    res.status(200).json({msg:"books endpoint"});
});
console.log(ENV.PORT)


const startSever = async ()=>{
    try {
        connectDB();
        app.listen(ENV.PORT,()=>{
            console.log(`server is running on http://localhost:${ENV.PORT}`)
        })
    } catch (error) {
        console.error("Error starting the server ", error);
    }
}

startSever();