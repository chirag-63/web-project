import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Navbar2 from "@/components/navbar/navbar2"

export default async function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar2/>
        {children}
      </main>
    </SidebarProvider>
  )
}
