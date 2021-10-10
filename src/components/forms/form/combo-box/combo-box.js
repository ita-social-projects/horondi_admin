import React from 'react';

import PropTypes from 'prop-types';
// import { noop } from 'lodash';

// import { useStyles } from './text-panel.styles';

export const ComboBox = ({ children }) => 
  // const styles = useStyles();

   <>{children}</>
;

ComboBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default ComboBox;
