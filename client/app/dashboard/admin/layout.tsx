"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { ProtectedRoute } from "@/components/shared/ProtectedRoutes";
import { ReduxProvider } from "@/store/provider";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ReduxProvider>
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <div className="flex min-h-screen w-screen overflow-x-hidden bg-gray-50 dark:bg-gray-900">
          <AdminSidebar
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-30 md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={
              isSidebarOpen
                ? "Close sidebar"
                : "Open sidebar"
            }
          >
            <Menu className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          </Button>
          <main
            className={`
              flex-1 p-4 sm:p-6 
              transition-all duration-300 ease-in-out
              ${isSidebarOpen ? "ml-72" : "ml-20"}
              sm:${isSidebarOpen ? "ml-72" : "ml-20"}
              md:${isSidebarOpen ? "ml-72" : "ml-20"}
              lg:${isSidebarOpen ? "ml-72" : "ml-20"}
              xl:${isSidebarOpen ? "ml-72" : "ml-20"}
              max-w-[calc(100vw-4rem)] sm:max-w-[calc(100vw-1.5rem)]
              max-h-screen
              overflow-y-hidden
            `}
          >
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </ReduxProvider>
  );
}
