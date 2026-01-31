import {StreamChat} from "stream-chat"
import {StreamClient} from "@stream-io/node-sdk"
import { ENV } from "./env.js"
const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("stream api key or secret missing")
}

export  const chatClient = StreamChat.getInstance(apiKey,apiSecret); // for chat messaging
export  const streamClient = new StreamClient(apiKey, apiSecret) // for video calls 

export const upsertStreamUser = async(userData)=>{
    try {
        await chatClient.upsertUser(userData);
        // return userData
        console.log("Stream user upserted succesfully ", userData);
    } catch (error) {
        console.error("Error upserting stream user",error)
    }
}
export const deleteStreamUser = async(userId)=>{
    try {
        await chatClient.deleteUser(userId);
        console.log("stream user deleted successfully", userId);
    } catch (error) {
        console.error("Error deleting stream user",error)
    }
}