import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { statsErrorMessages } from '../../../configs/error-messages';

const { NO_STATS } = statsErrorMessages;

const StatisticError = () => (
  <Box
    height='100%'
    display='flex'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
  >
    <Typography variant='h3'>{NO_STATS}</Typography>
  </Box>
);

export default StatisticError;
