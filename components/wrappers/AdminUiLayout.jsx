"use client";
import { useState } from "react";

import AdminHeader from "@/components/navigation/AdminHeader";
import AdminSidebar from "@/components/navigation/AdminSidebar";

export default function AdminUiLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="p-4 md:p-6 2xl:p-10">{children}</main>
      </div>
    </div>
  );
}
