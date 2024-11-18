"use client";

import * as React from "react";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { PiSignOut } from "react-icons/pi";
import { signOut } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";
// import Link from "next/link";
import { useRouter } from "next/navigation";

export function Drop() {
  const { user, userPhoto, userEmail } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.push("/"); // Redirect back to login page
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={userPhoto || "/logo.png"}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mb-4 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex gap-3">
            <img
              src={userPhoto || "/logo.png"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full  cursor-pointer"
            />
            <div>
              <p className="text-sm font-medium">
                {user?.displayName || "Anonymous User"}
              </p>
              <p className="text-base text-gray-600 ">{userEmail}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="flex gap-3 cursor-pointer"
          onClick={handleLogout}
        >
          <PiSignOut size={25} />
          Sign Out
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
