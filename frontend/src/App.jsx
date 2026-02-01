import { useState } from "react";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {Navigate, Route, Routes} from "react-router"
import HomePage from "./pages/homePage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
import DashBoardPage from "./pages/DashBoardPage.jsx";
function App() {
  const [count, setCount] = useState(0);
  const {isSignedIn, isLoaded} = useUser();
  if(!isLoaded) return null;
  return (
    <>
    <Routes>

      <Route path="/" element={!isSignedIn ?  <HomePage/> : <Navigate to={'/dashboard'}/>}/>
      <Route path="/dashboard" element={isSignedIn ?  <DashBoardPage/> : <HomePage/>}/>
      <Route path="/problems" element={isSignedIn ?<ProblemPage/> : <Navigate to={"/"}/>}/>

    </Routes>
    </>
  );
}

export default App;
