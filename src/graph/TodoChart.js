import React from 'react';
import Chart from 'react-apexcharts';

const TodoChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Pending', 'Complete', 'Edited'],
    },
    yaxis: {
      title: {
        text: 'Number of Tasks',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} tasks`;
        },
      },
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={[{ data: data }]}
      type="bar"
      height={350}
    />
  );
};

export default TodoChart;
