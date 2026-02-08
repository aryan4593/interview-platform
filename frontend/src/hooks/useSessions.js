import {useQuery, useMutation} from "@tanstack/react-query"
import toast from 'react-hot-toast'
import { sessionApi } from "../api/sessions.js"

export const useActiveSessions = ()=>{
    const result = useQuery({
        queryKey:["activeSessions"],
        queryFn : sessionApi.getActiveSession
    })

    return result
}

export const useMyRecentSessions = ()=>{
    const result = useQuery({
        queryKey:["myRecentSessions"],
        queryFn : sessionApi.getMyRecentSession
    })

    return result
}

export const useSessionById = (id)=>{
    const result = useQuery({
        queryKey:["session", id],
        queryFn : ()=> sessionApi.getSessionById(id),
        enabled: !!id, //convert to boool
        refetchInterval:5000 // refetch to check session changes

    })

    return result
}


export const useCreateSession = ()=>{
    const result = useMutation({
        mutationKey:["createSession"],
        mutationFn:sessionApi.createSession,
        onSuccess: ()=> toast.success("Session created successfully"),
        onError : (error)=> toast.error(error.resoponse?.data?.message || "failed to create room"),
    })
    return result;
}

export const useJoinSession = (id)=>{
    const result = useMutation({
        mutationKey:["joinSession"],
        mutationFn:sessionApi.joinSession,
        onSuccess: ()=> toast.success("Session Joined successfully"),
        onError : (error)=> toast.error(error.resoponse?.data?.message || "failed to join session"),
    })
    return result;
}
export const useEndSession = ()=>{
    const result = useMutation({
        mutationKey:["endSession"],
        mutationFn:sessionApi.useEndSession,
        onSuccess: ()=> toast.success("Session ended successfully"),
        onError : (error)=> toast.error(error.resoponse?.data?.message || "Failed to end session"),
    })
    return result;
}