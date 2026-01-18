import mongoose, { connect } from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async ()=>{
    try {
       if(!ENV.DB_URL){
        throw new Error('DB URL IS UNDEFINED')
       }
       const conn =  await mongoose.connect(ENV.DB_URL);
       console.log("connected to MongoDB", conn.connection.host)
    } catch (error) {
        console.error("X Error in connecting MongoDB ", error);
        process.exit(1); // 1 means failuire
    }
}