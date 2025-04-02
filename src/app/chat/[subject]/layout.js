"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar2 from "@/components/navbar/navbar2";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function Layout({ children }) {
  const params = useParams();
  const subject = decodeURIComponent(params.subject)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar2 />
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/experts">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to Experts</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Chat with {subject} Expert</h1>
            </div>
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Go to Home</span>
              </Button>
            </Link>
          </div>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
