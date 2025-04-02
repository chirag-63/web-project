"use client"
import { useRouter } from "next/navigation";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupAction
} from "@/components/ui/sidebar"
import { SquarePen, LogOut } from "lucide-react"
import Link from "next/link";

const items = [
    {
        title: "Operating System",
        url: "/chat/Operating System",
        icon: Inbox,
    },
    {
        title: "Computer Networks",
        url: "/chat/ComputerNetworks",
        icon: Inbox,
    },
    {
        title: "System Design",
        url: "/chat/SystemDesign",
        icon: Calendar,
    },
    {
        title: "Algorithms",
        url: "/chat/Algorithms",
        icon: Calendar,
    },
    {
        title: "Network Programming",
        url: "/chat/NetworkProgramming",
        icon: Calendar,
    },
    {
        title: "Compiler Design",
        url: "/chat/CompilerDesign",
        icon: Calendar,
    },
    {
        title: "Web Technology",
        url: "/chat/WebTechnology",
        icon: Calendar,
    },
    {
        title: "Data Structures",
        url: "/chat/DataStructures",
        icon: Calendar,
    },
    {
        title: "Cloud Computing",
        url: "/chat/CloudComputing",
        icon: Calendar,
    },
    {
        title: "Machine Learning",
        url: "/chat/MachineLearning",
        icon: Calendar,
    },
    {
        title: "OOPS",
        url: "/chat/oops",
        icon: Calendar,
    },
    {
        title: "DBMS",
        url: "/chat/dbms",
        icon: Calendar,
    },
];

export function AppSidebar({ subject }) {
    const router = useRouter();

    const handleNewChat = () => {
        const path = window.location.pathname;
        const len = path.length;
        router.push(`/chat/${path.slice(6, len)}`);
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="my-2 flex items-center justify-between mx-2">
                        <SidebarGroupLabel className="">Mentors</SidebarGroupLabel>
                        <Link href={'/experts'}>
                            <SidebarGroupAction
                                className="w-10 h-10 "
                                title="Home"
                                onClick={handleNewChat}
                            >
                                <LogOut className="h-full" />
                            </SidebarGroupAction>
                        </Link>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="h-10">
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
