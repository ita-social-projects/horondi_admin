import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Typography
} from '@material-ui/core';
import useBarData from '../../../hooks/stats/use-bar-data';
import { config } from '../../../configs';
import StatisticError from '../statistic-error';
import LoadingBar from '../../../components/loading-bar';

const { select, message } = config.labels.bar;

const StatisticBar = ({ onChangeBar, selectedValue, updating }) => {
  const { mainData, options } = useBarData();

  const barData = useSelector(({ Stats }) => Stats.bar);

  const {total} = barData[selectedValue];

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
          {updating ? (
            <LoadingBar />
          ) : mainData.datasets[0].data.length ? (
            <Bar data={mainData} options={options} redraw />
          ) : (
            <StatisticError />
          )}
        </Box>
      </CardContent>
      <Divider />
      {total ? (
        <Box p={2}>
          <Typography variant='body1'>
            {message[selectedValue] + total}
          </Typography>
        </Box>
      ) : (
        ''
      )}
    </Card>
  );
};

StatisticBar.propTypes = {
  onChangeBar: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  updating: PropTypes.bool.isRequired
};

export default StatisticBar;
