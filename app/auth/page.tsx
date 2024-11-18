'use client'
// import Link from "next/link";
import Image from "next/image";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user); // User details
      // alert(`Welcome, ${result.user.displayName}`); // Notify user of successful login
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center p-4">

   
    <div className="relative">
        <div className="absolute h-full opacity-30 w-full bg-gradient-to-r from-indigo-700 to-purple-700 blur-3xl animate-pulse duration-2000"></div>
        <div className="relative dark:bg-zinc-950/80 bg-white max-w-md  w-full flex flex-col gap-2 items-center p-6 border rounded-lg shadow-lg">
          <Image
            src={'/logo.png'}
            height={120}
            width={120}
            alt="Logo"
            className="drop-shadow-xl mt-6"
          />
          <div className="text-lg md:text-3xl font-extrabold tracking-wide mt-4`">
            Welcome to Note Nest
          </div>
          <div className="text-zinc-500 text-center text-xs md:text-base">
          Capture ideas effortlessly. Organize, nurture, and refine your thoughts in one seamless space. Welcome to NoteNest – where your brilliance finds a home.
          </div>
          <div className="w-full h-1 border-b my-4 "></div>
            <Link href= "/logout">
          <div className="w-full flex flex-row gap-2">
            <Button
             onClick={handleLogin}
              className="w-full flex flex-row gap-2 "
            >
              <FcGoogle size={30} /> Continue with Google
            </Button>
          </div>
            </Link>
        </div>
      </div>
      </div>
  );
};

export default Login;
