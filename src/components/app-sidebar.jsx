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
import { SquarePen } from "lucide-react"

const items = [
    {
        title: "chat 1",
        url: "/chat/subject1",
        icon: Home,
    },
    {
        title: "chat 2",
        url: "/chat/subject2",
        icon: Inbox,
    },
    {
        title: "chat 3",
        url: "/chat/subject3",
        icon: Calendar,
    },
];

export function AppSidebar({ subject }) {
    const router = useRouter();
    
    const handleNewChat = () => {
        const path = window.location.pathname;
        const len = path.length;
        router.push(`/chat/${path.slice(6,len)}`);
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="my-2 flex items-center justify-between mx-2">
                        <SidebarGroupLabel className="">Chat History</SidebarGroupLabel>
                        <SidebarGroupAction
                            className="w-10 h-10 "
                            title="New Chat"
                            onClick={handleNewChat}
                        >
                            <SquarePen className="h-full" />
                        </SidebarGroupAction>
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
