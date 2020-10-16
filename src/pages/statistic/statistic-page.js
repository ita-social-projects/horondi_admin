import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid, Box, Typography } from '@material-ui/core';

import BarStatistic from './bar-statistic';
import DoughnutStatistic from './doughnut-statistic';
import DateMenu from './date-menu';
import LoadingBar from '../../components/loading-bar';

import { config } from '../../configs';
import { getSalesByCategory } from '../../redux/stats/stats.actions';

const { mainPageTitle } = config.titles.statisticTitles;

const StatisticPage = () => {
  const loading = useSelector(({ Stats }) => Stats.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalesByCategory());
  }, [dispatch]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <Container maxWidth={false}>
      <Box mt={11}>
        <Grid container spacing={2} justify='space-between'>
          <Grid item>
            <Typography variant='h3'>{mainPageTitle}</Typography>
          </Grid>
          <Grid item>
            <DateMenu />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BarStatistic />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <DoughnutStatistic />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StatisticPage;
