import React from 'react';
import { Bar } from 'react-chartjs-2';

import StatisticError from '../pages/statistic/statistic-error';

export const handleStatisticBar = (mainData, options) =>
  mainData.datasets[0].data.length ? (
    <Bar data={mainData} options={options} redraw />
  ) : (
    <StatisticError />
  );
