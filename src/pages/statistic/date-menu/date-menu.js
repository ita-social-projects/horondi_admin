import React from 'react';

import { MenuItem, FormControl, Select, Grid, Box } from '@material-ui/core';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { useSelector } from 'react-redux';
import { config } from '../../../configs';

const { dateMenuOptions } = config.titles.statisticTitles;

const DateMenu = () => {
  const date = useSelector(({ Stats }) => Stats.date);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <Box mt={0.8}>
            <DateRangeOutlinedIcon />
          </Box>
        </Grid>
        <Grid item>
          <FormControl>
            <Select value={date}>
              <MenuItem value={7}>{dateMenuOptions[0]}</MenuItem>
              <MenuItem value={14}>{dateMenuOptions[1]}</MenuItem>
              <MenuItem value={30}>{dateMenuOptions[2]}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default DateMenu;
