'use client'
// import Image from "next/image";
// import { useAuth } from "./AuthContext";
// import Login from "./auth/page";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/toggle';

export default function Home() {
  // const { user, logOut } = useAuth();

  
  return (
    <div className="min-h-screen  flex justify-center items-center p-4">
    {/* Logo and Title */}
    <div className='relative'>
    <div className="absolute h-full opacity-30 w-full bg-gradient-to-r from-indigo-700 to-purple-700 blur-3xl animate-pulse duration-2000"></div>
    <div className="relative dark:bg-zinc-950/80 bg-white max-w-md  w-full flex flex-col gap-2 items-center p-6 border rounded-lg shadow-lg">
    <div className="flex items-center space-x-2">
      <Image src="/logo.png" alt="Logo" width={130} height={130} />
      <p className="text-xl md:text-4xl font-extrabold">NoteNest</p>
    </div>

    <p className="md:text-lg  font-bold text-neutral-900/40 dark:text-white/40">
      Nest your thoughts, nurture your brilliance.
    </p>
    
    {/* Button for Navigation */}
    <div className=' mt-2 flex gap-3'>
    <Button asChild className=" shadow-md font-semibold w-[9rem] h-[3rem]">
      <Link href="/auth">Get Started</Link>
    </Button>
 <ModeToggle/>
    </div>
    </div>

    </div>

  </div>
  );
}
