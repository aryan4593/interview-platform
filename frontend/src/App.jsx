import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import DashBoardPage from "./pages/DashBoardPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import SessionPage from "./pages/SessionPage.jsx";
function App() {
  const [count, setCount] = useState(0);
  const {isSignedIn, isLoaded} = useUser();
  if(!isLoaded) return null;
  return (
    <>
    <Routes>

      <Route path="/" element={!isSignedIn ?  <HomePage/> : <Navigate to={'/dashboard'}/>}/>
      <Route path="/dashboard" element={isSignedIn ?  <DashBoardPage/> : <HomePage/>}/>
      <Route path="/problems" element={isSignedIn ?<ProblemsPage/> : <Navigate to={"/"}/>}/>
      <Route path="/problems/:id" element={isSignedIn ?<ProblemPage/> : <Navigate to={"/"}/>}/>
      <Route path="/session/:id" element={isSignedIn ?<SessionPage/> : <Navigate to={"/"}/>}/>

    </Routes>
    </>
  );
}

export default App;
