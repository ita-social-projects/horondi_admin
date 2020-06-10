import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

import { useStyles } from './Sales-by-style';
import { dataSets, chartOptions, chartGenerator } from './Sales-by-helpers';

const chartTitle = 'Sales By Catalog';

const salesByCatalog = {
  Men: 372,
  Women: 465,
  Kids: 230
};

const SalesBy = () => {
  const classes = useStyles();
  const theme = useTheme();

  const chartLegends = chartGenerator(salesByCatalog);

  const labels = chartLegends.map((legend) => legend.title);
  const data = chartLegends.map((legend) => legend.value);

  const dataSet = dataSets(theme, data, labels);
  const options = chartOptions(theme);

  const chartLegendsItems = chartLegends.map((legend) => (
    <div className={classes.legend} key={legend.title}>
      <Typography variant='h5'>{legend.title}</Typography>
      <Typography style={{ color: legend.color }} variant='h2'>
        {legend.value}%
      </Typography>
    </div>
  ));

  return (
    <Card id='sales-by' className={classes.root}>
      <CardHeader title={chartTitle} />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={dataSet} options={options} />
        </div>
        <div className={classes.stats}>{chartLegendsItems}</div>
      </CardContent>
    </Card>
  );
};

export default SalesBy;
