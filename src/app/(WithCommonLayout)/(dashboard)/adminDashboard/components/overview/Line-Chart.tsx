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

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["12", "1", "4", "8", "10"],
    datasets: [
      {
        label: "Value",
        data: [0, 200, 100, 250, 50, 300],
        borderColor: "#CB3CFF",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#CB3CFF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
    <div className="md:pl-4 md:w-[600px]">
      <div className="text-center">
        <h1 className="text-xl text-left md:pl-6 text-[#AEB9E1]">Total Session</h1>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
