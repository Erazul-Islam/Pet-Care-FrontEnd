/* eslint-disable prettier/prettier */

"use client";

import React from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartRevenueAndExpense = () => {

    const data = {
        labels: ["Jan",  "Mar", "Apr", "May",  "Jul", "Aug", "Sep", "Nov", "Dec"],
        datasets: [
          {
            label: "Revenue",
            data: [15000, 10000, 8000, 12000, 9000, 15000, 18000, 20000, 17000, 19000, 22000, 17000],
            backgroundColor: "#CB3CFF",
            borderRadius: { topLeft: 6, topRight: 6 }, 
            barThickness: 10,
          },
          {
            label: "Expenses",
            data: [10000, 8000, 5000, 7000, 6000, 10000, 12000, 13000, 11000, 14000, 16000, 18000],
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
        <div className='w-[600px]'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChartRevenueAndExpense;