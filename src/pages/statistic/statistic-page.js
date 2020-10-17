import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid, Box, Typography } from '@material-ui/core';

import BarStatistic from './bar-statistic';
import DoughnutStatistic from './doughnut-statistic';
import DateMenu from './date-menu';
import LoadingBar from '../../components/loading-bar';

import {
  getPopularCategories,
  setBarValue,
  setDateValue,
  setDoughnutValue
} from '../../redux/stats/stats.actions';

import { config } from '../../configs';

const { mainPageTitle } = config.titles.statisticTitles;

const StatisticPage = () => {
  const dispatch = useDispatch();

  const { loading, doughnutValue, date, categories, barValue } = useSelector(
    ({ Stats }) => ({
      loading: Stats.loading,
      doughnutValue: Stats.doughnut.selectedValue,
      barValue: Stats.bar.selectedValue,
      date: Stats.date,
      categories: Stats.doughnut.categories
    })
  );

  useEffect(() => {
    if (!categories.counts.length) {
      dispatch(getPopularCategories());
    }
  }, [dispatch, categories.counts.length]);

  if (loading) {
    return <LoadingBar />;
  }

  const handleDoughnutValueChange = (e) => {
    dispatch(setDoughnutValue(e.target.value));
  };

  const handleDateChange = (e) => {
    const newDate = parseInt(e.target.value);
    dispatch(setDateValue(newDate));
  };

  const handleBarDataChange = (e) => {
    dispatch(setBarValue(e.target.value));
  };

  return (
    <Container maxWidth={false}>
      <Box mt={11}>
        <Grid container spacing={2} justify='space-between'>
          <Grid item>
            <Typography variant='h3'>{mainPageTitle}</Typography>
          </Grid>
          <Grid item>
            <DateMenu onChangeDate={handleDateChange} dateValue={date} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BarStatistic
              onChangeBar={handleBarDataChange}
              selectedValue={barValue}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <DoughnutStatistic
              onChangeDoughnut={handleDoughnutValueChange}
              selectedValue={doughnutValue}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StatisticPage;
