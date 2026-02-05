import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Sessions.js";

export async function createSession(req,res) {
    try {
        const {problem, difficulty} = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if(!problem || !difficulty){
            return res.status(400).json({message:"Problem or difficulty required"});
        }

        //generate uniuqe call id for stream video

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const session = await Session.create({problem, difficulty, host:userId,callId});

        ///create stream video call
        await streamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by_id:clerkId,
                custom:{problem,difficulty,sessionId:session._id.toString()}
            }
        });

        //chat msging

        const channel = chatClient.channel("messeging",callId,{
            name:`${problem} Session`,
            created_by:clerkId,
            members:[clerkId]
        });

        await channel.create();

        res.status(201).json({session});

    } catch (error) {
        console.log('error in createSession controller',error.message);
        res.status(500).json({message:"internal server error"})
    }
};

export async function getActiveSessions(_,res) {
    try {
       const sessions = await Session.find({status:"active"}).populate("host", "name profileImage email clerkId")
       .sort({createdAt:-1}).limit(20);

       res.status(200).json({sessions})

    } catch (error) {
        console.log('Error in getActiveSession controller', error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export async function getMyRecentSessions(req,res) {
    try {
        /// get sessions where user is host or participant
        const userId = req.user._id;
        const sessions = await Session.find({status:"completed",
            $or:[{host:userId}, {participant:userId}]
        }).sort({createdAt:-1}).limit(20);

        res.status(200).json({sessions})
    } catch (error) {
        console.log('Error in getMyRecentSessions controller', error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export async function getSessionById(req,res) {
    try {
        const {id} = req.params;

        const session = await Session.findById(id)
        .populate("host", "name email profileImage clerkId")
        .populate("participant", "name email profileImage clerkId");


        if(!session) res.status(404).json({message:"status not found"});

        res.status(200).json({session});
    } catch (error) {
        console.log('Error in getSessionById controller', error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export async function joinSession(req,res) {
    try {
        const {id} = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        
        const session = await Session.findById(id);
        
        if(!session) return res.status(404).json({message:"session not found"});
        //check if session is not active
        if(session.status != 'active') return res.status(404).json({message:"session is not active"})
        /// check if isession is already full
        if(session.participant) return res.status(409).json({message:"session is full"});

        if(session.host.toString() == userId.toString()) return res.status(404).json({message:"host can't join their own session as participant"})

        session.participant = userId;

        await session.save();
        
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);
        
        res.status(200).json({session});
        
    } catch (error) {
        console.log('Error in joinSession controller', error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export async function endSession(req,res) {
    try {
        
        const {id} = req.params;
        const userId = req.user._id;
        
        const session = await Session.findById(id);
        
        if(!session) return res.status(400).json({message:"Session not found"});
        
        /// check if user is host
        
        if(session.host.toString() !== userId.toString()){
            return res.status(400).json({message:"Only the host can end the session"});
        } 
        
        // check if already completed
        
        if(session.status == "completed"){
            return res.status(400).json({message:"sessionn is already completed"});
        }

        
        //delete call
        const call = streamClient.video.call("default", session.callId);
        await call.delete();
        
        //delete chat
        
        const chatChannel = chatClient.channel("messaging", session.callId);
        await chatChannel.delete();
        
        session.status = "completed";
        await session.save();

        res.status(200).json({session,message:"session ended successfully"});

    } catch (error) {
        console.log('Error in endSession controller', error.message);
        res.status(500).json({message:"Internal server error"});   
    }
        
};
