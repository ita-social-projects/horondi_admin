import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import { useStyles } from './legends-list.styles';
import { config } from '../../../../configs';

const { colors } = config.doughnut;

const LegendsList = ({ options, labels }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Box display='flex' justifyContent='center' mt={2}>
        {options.map((relation, idx) => (
          <Box key={labels[idx]} p={1} textAlign='center'>
            <Typography
              data-cy='doughnut-legent-name'
              color='textPrimary'
              variant='body1'
            >
              {labels[idx]}
            </Typography>
            <Typography
              data-cy='doughnut-legent-relation'
              style={{ color: colors[idx] }}
              variant='h2'
            >
              {relation}%
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

LegendsList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.number)
};

LegendsList.defaultProps = {
  labels: [],
  options: []
};

export default LegendsList;
