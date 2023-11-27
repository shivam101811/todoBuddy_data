import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Pie = ({ series }) => {
  const chartData = {
    series: series,
    options: {
      chart: {
        width: 600,
        type: 'pie',
      },
      labels: ['Incomplete', 'Complete', 'Edited'],
      plotOptions: {
        pie: {
          dataLabels: {
            style: {
              colors: ['#ffd700', '#008000', '#87CEEB'], // Yellow, Green, Light Blue
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        position: 'right',
      },
    },
  };

  return <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />;
};

export default Pie;
