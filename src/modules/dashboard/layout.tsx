"use client";
import { Sidebar } from "@/modules/dashboard/component/sidebar";
import { Header } from "@/modules/dashboard/component/header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <Header />

      <main className="flex-1 p-4 lg:ml-64 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
}
