"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "bank",
        data: [12244, 12314, 5192],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
        labels: " accountNames",
      },
    ],
  };

  return <Doughnut data={data} options={{ cutout: "70%" }} />;
};

export default DoughnutChart;
