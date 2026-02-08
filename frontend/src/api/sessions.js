import axiosInstance from "../lib/axios.js";

export const sessionApi = {
    createSession: async (data)=>{
        const response = await axiosInstance.post("/sessions",data);
        return response.data;
    },
    
    getActiveSession: async ()=>{
        const response = await axiosInstance.get("/sessions/active");
        console.log(response.data)
        return response.data;
    },
    getMyRecentSession: async ()=>{
        const response = await axiosInstance.get("/sessions/my-recent");
        return response.data;
    },
    getSessionById: async (id)=>{
        const response = await axiosInstance.get(`/sessions/${id}`);
        return response.data;
    },
    joinSession: async (id)=>{
        const response = await axiosInstance.post(`/sessions/${id}/join`);
        return response.data;
    },
    endSession: async (id)=>{
        const response = await axiosInstance.post(`/sessions/${id}/end`);
        return response.data;
    },
    getStreamToken: async ()=>{
        const response = await axiosInstance.get(`/chats/token`);
        return response.data;
    },

}