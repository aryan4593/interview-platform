import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to the app</h1>
      <SignedOut>
        <SignInButton mode="modal"><button>Hello, SignIn</button></SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton mode="modal" />
      </SignedIn>
      <UserButton />
    </>
  );
}

export default App;
