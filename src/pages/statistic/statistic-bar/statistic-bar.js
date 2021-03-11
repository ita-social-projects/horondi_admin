import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
import LoadingBar from '../../../components/loading-bar';
import { handleStatisticBar } from '../../../utils/handle-statistic-bar';

const { select, message } = config.labels.bar;

const StatisticBar = ({ onChangeBar, selectedValue, updating }) => {
  const { mainData, options } = useBarData();

  const barData = useSelector(({ Stats }) => Stats.bar);

  const { total } = barData[selectedValue];

  const barList = select.map(({ label, value }) => (
    <MenuItem data-cy={`bar-select-${label}`} key={value} value={value}>
      {label}
    </MenuItem>
  ));

  return (
    <Card>
      <CardHeader
        title={
          <FormControl>
            <Select
              data-cy='bar-selector'
              onChange={onChangeBar}
              value={selectedValue}
            >
              {barList}
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        <Box data-cy='bar-chart-box' height={400} position='relative'>
          {updating ? <LoadingBar /> : handleStatisticBar(mainData, options)}
        </Box>
      </CardContent>
      <Divider />
      {total ? (
        <Box p={2}>
          <Typography data-cy='total-count' variant='body1'>
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
