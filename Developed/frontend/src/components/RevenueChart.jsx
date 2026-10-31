
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const RevenueChart = () => {
  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Revenue",
        data: [420000, 510000, 480000, 650000, 720000, 845000],
        borderColor: "#635BFF",
        backgroundColor: "rgba(99, 91, 255, 0.10)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#635BFF",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            "₹" + context.parsed.y.toLocaleString("en-IN"),
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "₹" + (value / 100000) + "L",
        },
        grid: { color: "#F0F1F4" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bl-card revenue-card">
      <div className="section-heading">
        <div>
          <h5>Revenue Overview</h5>
          <p>Monthly revenue performance</p>
        </div>
        <span className="revenue-period">Last 6 months</span>
      </div>

      <div className="revenue-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
