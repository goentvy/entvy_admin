import { Outlet } from "react-router";
import { AppHeader, AppFooter } from "@/components/common";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <AppFooter />
    </div>
  );
}