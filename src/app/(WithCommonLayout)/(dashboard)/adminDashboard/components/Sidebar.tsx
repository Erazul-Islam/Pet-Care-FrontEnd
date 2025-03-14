/* eslint-disable prettier/prettier */
"use client"

import { useState } from "react";
import Link from "next/link";
import { Home, Settings, BarChart2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/adminDashboard", icon: <Home size={20} /> },
  {
    name: "Analytics",
    path: "/adminDashboard/user-management",
    icon: <BarChart2 size={20} />,
  },
  {
    name: "Settings",
    path: "/adminDashboard/post-management",
    icon: <Settings size={20} />,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname()

  return (
    <motion.aside 
      className={`bg-gray-900 text-white ${isOpen ? "w-64" : "w-16"} transition-all duration-300 min-h-screen p-4`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none p-2 mb-4"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Items */}
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={`flex items-center gap-3 p-2 rounded-lg ${pathname === item.path ? "bg-pink-700" : "hover:bg-gray-700"} `}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
