"use client"
import { SidebarTrigger } from "../ui/sidebar"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar2() {
    return (
        <div className="flex h-16 w-full items-center bg-background rounded-none sticky top-0 z-50 px-2 gap-6">
            <SidebarTrigger title="Toggle Sidebar" />
            <div className="flex justify-between items-center w-full mr-5">
                <div>
                    hello1
                </div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}