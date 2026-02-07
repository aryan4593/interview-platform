import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions.js";
import Navbar from "../components/Navbar.jsx";
import WelcomeSection from "../components/WelcomeSection.jsx";
import ActiveSessions from "../components/ActiveSessions.jsx";
import StatsCard from "../components/StatsCard.jsx";
import RecentSessions from "../components/RecentSessions.jsx";
import CreateSessionModal from "../components/CreateSessionModal.jsx";

function DashBoardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [roomConfig, setRoomConfig] = React.useState({
    problem: "",
    difficulty: "",
  });

  const createSessionMutation = useCreateSession();
  const { data: activeSessionData, isLoading: laodingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

    
    const handleCreateRoom = () => {
      if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.sessions._id}`);
        },
      },
    );
  };

  const activeSessions = activeSessionData?.sessions || [];
  const recentSessions = recentSessionData?.sessions || [];

  const isUserInSession = (session)=>{
    if(!user.id) return false;

    return session.host?.clerkId == user.id || session.participant?.clerkId == user.id
  }
  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* grid layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCard
              activeSessionsCount = {activeSessions.length}
              recentSessionsCount = { recentSessions.length}
            />
            <ActiveSessions 
              sessions = {activeSessions}
              isLoading = {laodingActiveSessions}
              isUserInSession = {isUserInSession}
            />
          </div>

          <RecentSessions
            sessions = {recentSessions}
            isLoading = {loadingRecentSessions}
          />
        </div>
      </div>
      
      <CreateSessionModal
        isOpen= {showCreateModal}
        onClose = {()=>{setShowCreateModal(false)}}
        roomConfig = {roomConfig}
        setRoomConfig = {setRoomConfig}
        onCreateRoom = {handleCreateRoom}
        isCreating = {createSessionMutation.isPending}
      />
    </>
  );
}

export default DashBoardPage;
