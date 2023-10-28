import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";
import { Line } from "react-chartjs-2";

const SalesReport = () => {
  const { token } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const { getSalesDashboard } = useApi();

  useEffect(() => {
    const fetchSalesData = async () => {
      const data = await getSalesDashboard(token);
      setSalesData(data);
    };
    fetchSalesData();
  }, [token]);

  useEffect(() => {
    const createChart = () => {
      const ctx = document.getElementById("salesChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: salesData.map((sale) => sale.date),
          datasets: [
            {
              label: "Vendas",
              data: salesData.map((sale) => sale.amount),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      });
    };

    if (salesData.length > 0) {
      createChart();
    }
  }, [salesData]);

  return (
    <div>
      <h2>Relatório de Vendas</h2>
      <canvas id="salesChart" width="400" height="200"></canvas>
      <Line data={chartData} />
    </div>
  );
};

export default SalesReport;
