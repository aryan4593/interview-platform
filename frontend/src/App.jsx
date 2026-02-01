import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
function App() {
  const [count, setCount] = useState(0);
  const {isSignedIn} = useUser()
  return (
    <>
    <h1 className="text-red-50">Welcome to the app</h1>
    <Routes>

      <Route path="/" element={<HomePage/>}/>
      <Route path="/problems" element={isSignedIn ?<ProblemPage/> : <Navigate to={"/"}/>}/>

    </Routes>
    </>
  );
}

export default App;
