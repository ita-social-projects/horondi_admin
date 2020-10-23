import React from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import useBarData from '../../../hooks/stats/use-bar-data';
import { config } from '../../../configs';
import StatisticError from '../statistic-error';

const { select } = config.labels.bar;

const BarStatistic = ({ onChangeBar, selectedValue }) => {
  const { mainData, options } = useBarData();

  const barList = select.map(({ label, value }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));

  return (
    <Card>
      <CardHeader
        title={
          <FormControl>
            <Select onChange={onChangeBar} value={selectedValue}>
              {barList}
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        <Box height={400} position='relative'>
          {mainData.datasets[0].data.length ? (
            <Bar data={mainData} options={options} />
          ) : (
            <StatisticError />
          )}
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

BarStatistic.propTypes = {
  onChangeBar: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default BarStatistic;
