import React from 'react';

import PropTypes from 'prop-types';
// import { noop } from 'lodash';

// import { useStyles } from './custom-dropdown.styles';

export const CustomDropdown = ({ children }) => 
  // const styles = useStyles();

   <>{children}</>
;

CustomDropdown.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default CustomDropdown;
