import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default TabPanel;
