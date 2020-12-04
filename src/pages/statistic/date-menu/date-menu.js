import React from 'react';
import PropTypes from 'prop-types';

import {
  MenuItem,
  FormControl,
  Select,
  Grid,
  Box,
  Tooltip
} from '@material-ui/core';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { config } from '../../../configs';

const {
  labels: { doughnut },
  titles: { statisticTitles }
} = config;

const DateMenu = ({ dateValue, onChangeDate }) => {
  const dateList = doughnut.dateMenuOptions.map(({ label, value }) => (
    <MenuItem data-cy={`date-select-${label}`} key={label} value={value}>
      {label}
    </MenuItem>
  ));

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <Box mt={0.8}>
            <Tooltip placement='left' title={statisticTitles.dateSortTitle}>
              <DateRangeOutlinedIcon />
            </Tooltip>
          </Box>
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              data-cy='date-selector'
              onChange={onChangeDate}
              value={dateValue}
            >
              {dateList}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

DateMenu.propTypes = {
  dateValue: PropTypes.number.isRequired,
  onChangeDate: PropTypes.func.isRequired
};

export default DateMenu;
