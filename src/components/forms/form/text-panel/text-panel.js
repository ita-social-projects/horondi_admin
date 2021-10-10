import React from 'react';

import PropTypes from 'prop-types';
// import { noop } from 'lodash';

// import { useStyles } from './text-panel.styles';

export const TextPanel = ({ children }) => 
  // const styles = useStyles();

   <>{children}</>
;

TextPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default TextPanel;
