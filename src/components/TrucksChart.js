"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function TrucksChart({ totalTrucks, inTransit, idle, avgIdleTime }) {
  const chartData = {
    labels: ["Total Trucks", "In Transit", "Idle", "Avg Idle Time (hrs)"],
    datasets: [
      {
        label: "Trucks Overview",
        data: [
          totalTrucks,
          inTransit,
          idle,
          avgIdleTime,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)", // Blue
          "rgba(34, 197, 94, 0.5)", // Green
          "rgba(234, 179, 8, 0.5)", // Yellow
          "rgba(239, 68, 68, 0.5)", // Red
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
          "rgb(234, 179, 8)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Trucks Overview Dashboard",
      },
    },
  }

  return (
    <div className="w-full mt-2 my-4 h-full flex justify-center sm:h-[50vh]">
      {/* for tablet and desktop */}
      <div className="hidden sm:block w-full h-full md:flex justify-center">
        <Bar data={chartData} options={options} className="hidden sm:flex" />
      </div>

      {/* for mobile */}
      <div className="w-full overflow-x-auto sm:hidden">
        <div className="min-w-[400px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}