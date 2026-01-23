import express from "express"
import path, { dirname } from "path"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors"
import {serve} from "inngest/express"
import { inngest,functions} from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from './routes/chatRoutes.js'
const app = express();


const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL, credentials:true})); //credetial true means server allows cookies on request

app.use("/api/ingest", serve({client:inngest, functions}))

app.use(clerkMiddleware()); //this add auth field to request object: req.auth()
app.get("/health", (req, res)=>{
    res.status(200).json({msg:"API is up and running"});
});
app.use("/api/chats",chatRoutes)
app.get("/video-calls", protectRoute, (req, res)=>{
    res.status(200).json({msg:"vc endpoint, protected route"});
});

//Make this app deployment ready
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend/dist"));
    })
}
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