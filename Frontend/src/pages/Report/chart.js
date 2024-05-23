import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import GoBack from "../../components/GoBack";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('tokens');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get('http://localhost:4060/api/chart', {
          headers: {
            'x-access-token': token
          }
        });
        const data = response.data;
        const formattedData = formatChartData(data);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching or formatting data:", error);
      }
    };

    getData();
  }, []);

  const formatChartData = (data) => {
    const labels = data.map(entry => `${entry.month}/${entry.year}`);
    const revenues = data.map(entry => entry.totalRevenue);

    return {
      labels,
      datasets: [
        {
          label: 'Total Revenue',
          data: revenues,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="card-button">
          <GoBack />
        </span>
        <strong>Monthly Revenue</strong>
      </div>
      <div className="card-body overflow-hidden">
        {chartData.labels ? <Line data={chartData} /> : <p>Loading data...</p>}
        <div id="chart-container" className="w-100 h-100"></div>
      </div>
    </div>
  );
};

export default RevenueChart;
