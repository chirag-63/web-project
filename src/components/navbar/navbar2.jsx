"use client";
import { SidebarTrigger } from "../ui/sidebar";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Home, TreePine, Palette } from "lucide-react";

export default function Navbar2() {
  return (
    <div className="flex h-16 w-full items-center bg-background rounded-none sticky top-0 z-50 px-2 gap-6">
      <SidebarTrigger title="Toggle Sidebar" />
      <div className="flex justify-between items-center w-full mr-5">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/experts"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <TreePine className="w-5 h-5" />
            <span>Experts</span>
          </Link>
          <Link
            href="/playground"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <Palette className="w-5 h-5" />
            <span>Playground</span>
          </Link>
          <Link
            href="/tree-visualizer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <TreePine className="w-5 h-5" />
            <span>Tree Visualizer</span>
          </Link>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
