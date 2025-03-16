/* eslint-disable prettier/prettier */
import React from "react";

import RevenueAndExpenseChart from "../overview/Revenue-And-Expense-Chart";

import Stat from "./Stat";
import BarChartRevenueAndExpense from "./BarChart-Revenue-Expense";
import LineChart from "./Line-Chart";

import { useUser } from "@/src/context/user.provider";



const AdminOverView = () => {
  const { user } = useUser();

  return (
    <div className="lg:mr-12 mr-3">
      <h1 className="font-semibold text-center md:text-left text-2xl">Welcome back, {user?.name}</h1>
      <Stat />
      <div className="md:flex bg-[#0B1739] gap-8 border rounded-md mt-7 p-4 border-gray-600">
        <RevenueAndExpenseChart />
        <div>
          <BarChartRevenueAndExpense />
          <LineChart/>
        </div>
      </div>
    </div>
  );
};

export default AdminOverView;
