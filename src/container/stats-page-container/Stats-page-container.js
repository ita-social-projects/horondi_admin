import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from './Stats-page-container-styles';
import LatestOrders from '../../components/statistic-page/latest-orders';
import LatestSales from '../../components/statistic-page/latest-sales';
import SalesBy from '../../components/statistic-page/sales-by';

const StatsPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.statsPageContainer}>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4}>
          <SalesBy />
        </Grid>
        <Grid item sm={12} md={8}>
          <LatestSales />
        </Grid>
        <Grid item sm={12} md={12}>
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default StatsPageContainer;
