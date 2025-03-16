/* eslint-disable prettier/prettier */

"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BarChartRevenueAndExpense from "./BarChart-Revenue-Expense";
import { MoveUpRight } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const RevenueAndExpenseChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          5000, 7000, 8000, 12000, 9000, 15000, 18000, 20000, 17000, 19000,
          22000, 25000,
        ],
        borderColor: "#CB3CFF",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#CB3CFF",
      },
      {
        label: "Expenses",
        data: [
          3000, 4000, 5000, 7000, 6000, 10000, 12000, 13000, 11000, 14000,
          16000, 18000,
        ],
        borderColor: "#00C2FF",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#00C2FF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          font: { size: 14 },
        },
      },
      y: {
        title: {
          display: true,
          font: { size: 14 },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="lg:w-[900px] h-full">
      <h1 className="text-xl pl-6 text-[#AEB9E1]">Total Revenue</h1>
      <div className="text-3xl pl-6 p-4 flex items-center">
        $280k{" "}
        <div className="  flex items-center ml-2 bg-[#14CA74] p-1 h-6 rounded-sm text-[12px]">
          12.4% <MoveUpRight size={18} />
        </div>{" "}
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueAndExpenseChart;
