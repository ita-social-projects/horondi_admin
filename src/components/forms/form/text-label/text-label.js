import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

import { useStyles } from './text-label.styles';

const TextLabel = ({ text, ...props }) => {
  const styles = useStyles();

  return (
    <Box>
      <Typography className={styles.textLabel} {...props}>
        {text}
      </Typography>
    </Box>
  );
};

TextLabel.propTypes = {
  text: PropTypes.string.isRequired
};

export default TextLabel;
