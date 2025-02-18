"use client";

import { sidebarItems } from "../constants/navItems";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background/95 backdrop-blur lg:block">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <nav className="mt-8 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="w-full flex items-center justify-start px-4 py-2 text-left text-gray-400 hover:bg-gray-800 rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
