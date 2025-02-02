"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar(){
    return (
        <div className="flex w-full h-16 items-center justify-center ">
            <SignedIn>
                <UserButton/>
            </SignedIn>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
        </div>
    )
}