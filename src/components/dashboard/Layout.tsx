/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import React, { ReactNode, useState } from "react";
import UserManagement from "./adminUi/UserManagement";
import PostsManagement from "./adminUi/PostsManagement";
import PaymentManagement from "./adminUi/PaymentManagement";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import {
  Home,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@nextui-org/button";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [activeSection, setActiveSection] = useState("payment");
  const [collapsed, setCollapsed] = useState(false);

  const sections = [
    { id: "payment", label: "Payment Info" },
    { id: "user", label: "User Management" },
    { id: "post", label: "post Management" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Payment Info":
        return <PaymentManagement />;
      case "user":
        return <UserManagement />;
      case "post":
        return <PostsManagement />;
      case "Home":
      default:
        return <div>Home Section</div>;
    }
  };

  return (
    // <div className="flex">
    //   <div className="w-64 border p-4">
    //     <h2 className="text-lg font-bold mb-4">Dashboard</h2>
    //     <nav>
    //       <ul>
    //         {sections.map((section) => (
    //           <li key={section.id} className="mb-2">
    //             <button
    //               onClick={() => setActiveSection(section.id)}
    //               className={`block w-full py-2 px-3 text-left rounded ${
    //                 activeSection === section.id ? "bg-pink-600 text-white" : ""
    //               }`}
    //             >
    //               {section.label}
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </nav>
    //   </div>
    //   <div className="flex-1 p-6">
    //     <main>{renderSection()}</main>
    //   </div>
    // </div>

    <div className="flex">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} className=" text-white h-full">
        <div className="p-4 flex justify-between items-center">
          <h1
            className={`text-xl font-semibold ${collapsed ? "hidden" : "block"}`}
          >
            Dashboard
          </h1>
          <Button
            isIconOnly
            variant="light"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white"
          >
            {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </Button>
        </div>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#7aff33",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem icon={<Home size={20} />}> Home </MenuItem>
          <SubMenu label="Profile" icon={<User size={20} />}>
            <MenuItem> View Profile </MenuItem>
            <MenuItem> Edit Profile </MenuItem>
          </SubMenu>
          <MenuItem icon={<Settings size={20} />}> Settings </MenuItem>
          <MenuItem icon={<LogOut size={20} />}> Logout </MenuItem>
        </Menu>
      </Sidebar>

      {/* Content Area */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      </main>
    </div>
  );
};

export default Layout;
