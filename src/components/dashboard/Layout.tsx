/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import React, { ReactNode, useState } from "react";
// import UserManagement from "./adminUi/UserManagement";
import PostsManagement from "./adminUi/PostsManagement";
import PaymentManagement from "./adminUi/PaymentManagement";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [activeSection, setActiveSection] = useState("payment");

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
        // return <UserManagement />;
      case "post":
        return <PostsManagement />;
      case "Home":
      default:
        return <div>Home Section</div>;
    }
  };

  return (
    <div className="flex">
      <div className="w-64 border p-4">
        <h2 className="text-lg font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="mb-2">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`block w-full py-2 px-3 text-left rounded ${
                    activeSection === section.id ? "bg-pink-600 text-white" : ""
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <main>{renderSection()}</main>
      </div>
    </div>
  );
};

export default Layout;
