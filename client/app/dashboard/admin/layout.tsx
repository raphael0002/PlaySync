import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { ProtectedRoute } from "@/components/shared/ProtectedRoutes";
import { ReduxProvider } from "@/store/provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 p-6 bg-background overflow-auto">
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </ReduxProvider>
  );
}
