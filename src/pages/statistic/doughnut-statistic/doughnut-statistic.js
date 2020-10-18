import React from 'react';
import PropTypes from 'prop-types';

import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import useDoughnutData from '../../../hooks/stats/use-doughnut-data';
import useStyles from './doughnut-statistic.styles';

import LegendsList from './legends-list/legends-list';

import { config } from '../../../configs';
import { statsErrorMessages } from '../../../configs/error-messages';
import StatisticError from '../statistic-error';

const { select } = config.labels.doughnut;
const { NO_STATS } = statsErrorMessages;

const DoughnutStatistic = ({ selectedValue, onChangeDoughnut }) => {
  const styles = useStyles();

  const { mainData, options, relations, names } = useDoughnutData();

  const doughnutList = select.map(({ label, value }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));

  return (
    <Card className={styles.root}>
      <CardHeader
        title={
          <FormControl>
            <Select onChange={onChangeDoughnut} value={selectedValue}>
              {doughnutList}
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        <Box height={300} position='relative'>
          {mainData.datasets[0].data.length ? (
            <Doughnut data={mainData} options={options} />
          ) : (
            <StatisticError />
          )}
        </Box>
        <LegendsList options={relations} labels={names} />
      </CardContent>
    </Card>
  );
};

DoughnutStatistic.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  onChangeDoughnut: PropTypes.func.isRequired
};

export default DoughnutStatistic;
