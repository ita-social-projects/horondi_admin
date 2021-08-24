import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './container-filters.styles';

const ContainerFilters = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.container}>{children}</div>;
};

ContainerFilters.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default ContainerFilters;
