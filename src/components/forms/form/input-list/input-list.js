import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

const InputList = ({ children, ...props }) => (
  <Grid {...props}>{children}</Grid>
);

InputList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default InputList;
