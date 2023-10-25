import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";

const SalesReport = () => {
  const { token } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const { getSalesDashboard } = useApi();

  useEffect(() => {
    const fetchSalesData = async () => {
      const data = await getSalesDashboard(token);
      setSalesData(data);
      console.log("Token:", token);
    };
    fetchSalesData();
  }, [token]);

  const chartData = {
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
  };

  return (
    <div>
      <h2>Relatório de Vendas</h2>
      <Line data={chartData} />
    </div>
  );
};

export default SalesReport;
