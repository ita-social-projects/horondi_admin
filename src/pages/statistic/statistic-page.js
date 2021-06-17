import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid, Box, Typography } from '@material-ui/core';

import StatisticBar from './statistic-bar';
import StatisticDoughnut from './statistic-doughnut';
import DateMenu from './date-menu';
import LoadingBar from '../../components/loading-bar';

import {
  getAllOrdersStats,
  getIniitalStats,
  setBarValue,
  setDateValue,
  setDoughnutValue,
  getPaidOrdersStats,
  getUsersByDays
} from '../../redux/stats/stats.actions';

import { config } from '../../configs';
import { useCommonStyles } from '../common.styles';
import { getInitialStatsHandler } from '../../utils/statistic-page';

const {
  titles: {
    statisticTitles: { mainPageTitle }
  },
  labels: { doughnut, bar }
} = config;

const StatisticPage = () => {
  const common = useCommonStyles();
  const dispatch = useDispatch();

  const fetchedDoughnutStats = useRef([]);
  const fetchedBarStats = useRef([]);

  const {
    loading,
    date,
    doughnutValue,
    doughnutData,
    barValue,
    updatingBar,
    updatingDoughnut
  } = useSelector(({ Stats }) => ({
    loading: Stats.loading,
    date: Stats.date,
    doughnutValue: Stats.doughnut.selectedValue,
    doughnutData: Stats.doughnut,
    barValue: Stats.bar.selectedValue,
    updatingBar: Stats.bar.updatingData,
    updatingDoughnut: Stats.doughnut.updatingData
  }));

  useEffect(() => {
    const { categories } = doughnutData;
    getInitialStatsHandler(categories, dispatch, getIniitalStats);
  }, [dispatch, doughnutData]);

  if (loading) {
    return <LoadingBar />;
  }

  const handleDateChange = (e) => {
    fetchedBarStats.current = [];
    fetchedDoughnutStats.current = [];
    const newDate = parseInt(e.target.value);
    dispatch(setDateValue(newDate));
    if (doughnutValue === doughnut.select[1].value) {
      dispatch(getAllOrdersStats(date));
    }

    switch (barValue) {
      case barValue === bar.select[1].value:
        dispatch(getPaidOrdersStats(date));
        break;
      case barValue === bar.select[2].value:
        dispatch(getUsersByDays(date));
        break;
      default:
        break;
    }

    fetchedDoughnutStats.current.push(doughnutValue);
    fetchedBarStats.current.push(barValue);
  };

  const handleDoughnutValueChange = (e) => {
    const { value } = e.target;
    const { select } = doughnut;
    const isFetched = fetchedDoughnutStats.current.includes(value);
    const selectEqualsFirstValue = value === select[1].value;
    const firstValueAndNotFetched = selectEqualsFirstValue && !isFetched;
    if (firstValueAndNotFetched) {
      dispatch(getAllOrdersStats(date));
      fetchedDoughnutStats.current.push(value);
    }
    dispatch(setDoughnutValue(value));
  };

  const handleBarValueChange = (e) => {
    const { value } = e.target;
    const { select } = bar;
    const isFetched = fetchedBarStats.current.includes(value);
    const selectEqualsFirstValue = value === select[1].value;
    const selectEqualsSecondValue = value === select[2].value;
    const firstValueAndNotFetched = selectEqualsFirstValue && !isFetched;
    const secondValueAndNotFetched = selectEqualsSecondValue && !isFetched;
    if (firstValueAndNotFetched) {
      dispatch(getPaidOrdersStats(date));
      fetchedBarStats.current.push(value);
    }
    if (secondValueAndNotFetched) {
      dispatch(getUsersByDays(date));
      fetchedBarStats.current.push(value);
    }
    dispatch(setBarValue(value));
  };

  return (
    <Container maxWidth={false}>
      <Box mt={11}>
        <Grid container spacing={2} justify='space-between'>
          <Grid item>
            <Typography
              data-cy='page-title'
              variant='h1'
              className={common.materialTitle}
            >
              {mainPageTitle}
            </Typography>
          </Grid>
          <Grid item>
            <DateMenu onChangeDate={handleDateChange} dateValue={date} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <StatisticBar
              updating={updatingBar}
              onChangeBar={handleBarValueChange}
              selectedValue={barValue}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <StatisticDoughnut
              updating={updatingDoughnut}
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
