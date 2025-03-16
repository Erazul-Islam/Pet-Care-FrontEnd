/* eslint-disable prettier/prettier */
import React, { ReactNode } from "react";

import Sidebar from "./components/Sidebar";

const AdminDashboard = ({ children }: { children: ReactNode }) => {

  return (
    <div className="flex bg-[#081028]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 md:pl-8 pl-2">{children}</main>
    </div>
  );
};

export default AdminDashboard;