import {SignedOut, SignedIn, SignInButton, SignOutButton, UserButton} from "@clerk/clerk-react"
import toast from "react-hot-toast"
function HomePage() {
  return (
    <div>
      <button className="btn btn-secondary" onClick={()=>toast.success("this is a success toast")}>click me</button>
      <SignedOut>
        <SignInButton mode="modal">
            <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton></SignOutButton>
      </SignedIn>

      <UserButton/>
    </div>
  )
}

export default HomePage