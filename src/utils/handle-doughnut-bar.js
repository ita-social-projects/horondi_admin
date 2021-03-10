import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import StatisticError from '../pages/statistic/statistic-error';

export const handleDoughnutBar = (mainData, options) =>
  mainData.datasets[0].data.length ? (
    <Doughnut data={mainData} options={options} redraw />
  ) : (
    <StatisticError />
  );
