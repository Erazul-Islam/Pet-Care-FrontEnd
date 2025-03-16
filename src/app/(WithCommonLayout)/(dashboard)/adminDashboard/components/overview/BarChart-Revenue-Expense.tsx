/* eslint-disable prettier/prettier */

"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MoveUpRight } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartRevenueAndExpense = () => {
  const data = {
    labels: ["12 AM", "8 AM", "10 AM", "1 PM", "3 PM", "6 PM", "10 Pm"],
    datasets: [
      {
        label: "Revenue",
        data: [
          15000, 10000, 8000, 12000, 9000, 15000, 18000, 20000, 17000, 19000,
          22000, 17000,
        ],
        backgroundColor: "#CB3CFF",
        borderRadius: { topLeft: 6, topRight: 6 },
        barThickness: 10,
      },
      {
        label: "Expenses",
        data: [
          10000, 8000, 5000, 7000, 6000, 10000, 12000, 13000, 11000, 14000,
          16000, 18000,
        ],
        backgroundColor: "#00C2FF",
        borderRadius: { topLeft: 6, topRight: 6 },
        barThickness: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
    <div className="md:w-[600px] w-[350px]">
      <div className="flex justify-between">
        <h1 className="md:text-xl md:pl-6 text-[#AEB9E1]">Total Profit</h1>
        <div className="md:text-3xl flex items-center">
          $140k{" "}
          <div className="  flex items-center ml-2 bg-[#14CA74] p-1 h-6 rounded-sm md:text-[12px]">
            2.4% <MoveUpRight size={18} />
          </div>{" "}
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartRevenueAndExpense;
