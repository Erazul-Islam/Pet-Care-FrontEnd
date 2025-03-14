/* eslint-disable prettier/prettier */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Menu, X, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BsSignpostSplitFill } from "react-icons/bs";

const menuItems = [
  { name: "Overview", path: "/adminDashboard", icon: <Home size={20} /> },
  {
    name: "Users",
    path: "/adminDashboard/user-management",
    icon: <User size={20} />,
  },
  {
    name: "Posts",
    path: "/adminDashboard/post-management",
    icon: <BsSignpostSplitFill size={20} />,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ width: "16rem" }}
      animate={{ width: isOpen ? "16rem" : "4rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[#0F1E33] text-white p-4 h-screen rounded-md relative"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-4 p-1 text-white ${isOpen ? "right-[8px]" : ""} focus:outline-none  rounded-full`}
      >
        <motion.div
          key={isOpen ? "open" : "close"}
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      {/* Menu Items */}
      <nav className="space-y-4 mt-14">
        {menuItems.map((item) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={item.path}
              className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200 ${
                pathname === item.path
                  ? "bg-[#92FE9D] text-[#000000]"
                  : "hover:bg-gray-800 text-[#898989]"
              }`}
            >
              {item.icon}
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
