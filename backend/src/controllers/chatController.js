import { chatClient } from "../lib/stream.js"

export async function getStreamToken(req,res) {
    try {
        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId:req.user.clerkId,
            userName:req.user.name,
            userImage:req.user.Image,
        })
    } catch (error) {
        console.log("Error in getting getStreamToken Controller", error);
        req.status(500).json({message:"internel server error"});
    }   
}