import React from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import { config } from '../../../configs';

const {
  mainStatisticOptions,
  mainStatisticLabel
} = config.titles.statisticTitles;

const BarStatistic = ({ onChangeBar, selectedValue }) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: theme.palette.secondary.main,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: mainStatisticLabel,
        maxBarThickness: 20,
        categoryPercentage: 0.5
      }
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const barList = mainStatisticOptions.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
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
          <Bar data={data} options={options} />
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
