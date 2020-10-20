import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

import { config } from '../../../../configs';

const { colors } = config.doughnut;

const LegendsList = ({ options, labels }) => (
  <Box display='flex' justifyContent='center' mt={2}>
    {options.map((relation, idx) => (
      <Box key={relation} p={1} textAlign='center'>
        <Typography color='textPrimary' variant='body1'>
          {labels[idx]}
        </Typography>
        <Typography style={{ color: colors[idx] }} variant='h2'>
          {relation}%
        </Typography>
      </Box>
    ))}
  </Box>
);

LegendsList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.number)
};

LegendsList.defaultProps = {
  labels: [],
  options: []
};

export default LegendsList;
