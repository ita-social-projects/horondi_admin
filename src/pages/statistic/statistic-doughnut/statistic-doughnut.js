import React from 'react';
import PropTypes from 'prop-types';

import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import useDoughnutData from '../../../hooks/stats/use-doughnut-data';
import useStyles from './statistic-doughnut.styles';

import LegendsList from './legends-list/legends-list';
import StatisticError from '../statistic-error';

import { config } from '../../../configs';
import LoadingBar from '../../../components/loading-bar';

const { select } = config.labels.doughnut;

const StatisticDoughnut = ({ selectedValue, onChangeDoughnut, updating }) => {
  const styles = useStyles();

  const { mainData, options, relations, labels } = useDoughnutData();

  const doughnutList = select.map(({ label, value }) => (
    <MenuItem data-cy={`doughnut-select-${label}`} key={value} value={value}>
      {label}
    </MenuItem>
  ));

  return (
    <Card className={styles.root}>
      <CardHeader
        title={
          <FormControl>
            <Select
              data-cy='doughnut-selector'
              onChange={onChangeDoughnut}
              value={selectedValue}
            >
              {doughnutList}
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        {updating ? (
          <LoadingBar />
        ) : (
          <>
            <Box data-cy='doughnut-chart-box' height={300} position='relative'>
              {mainData.datasets[0].data.length ? (
                <Doughnut redraw data={mainData} options={options} />
              ) : (
                <StatisticError />
              )}
            </Box>
            <LegendsList options={relations} labels={labels} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

StatisticDoughnut.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onChangeDoughnut: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired
};

export default StatisticDoughnut;
