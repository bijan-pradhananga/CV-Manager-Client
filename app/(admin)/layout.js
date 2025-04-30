import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default async function Layout({ children }) {
    const session = await auth();
    
    return (
        <div className="min-h-screen flex flex-col">
            <SessionProvider session={session}>
                <SidebarProvider>
                    <AppSidebar />
                    {/* Main Content */}
                    <main className="flex-grow container mx-auto py-8 px-4">
                        {children}
                    </main>
                </SidebarProvider>
            </SessionProvider>
        </div>
    );
}
