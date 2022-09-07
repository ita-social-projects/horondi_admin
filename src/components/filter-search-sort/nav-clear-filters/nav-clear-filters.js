import React from 'react';
import { Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { useStyles } from './nav-clear-filters.styles';
import { config } from '../../../configs';

const { CLEAR_FILTERS } = config.buttonTitles;

const NavClearFilters = ({ clearOptions: { clearAllFilters } }) => {
  const styles = useStyles();

  const handleClearFilters = () => {
    clearAllFilters();
  };
  return (
    <Box ml={1}>
      <Button className={styles.clearButton} onClick={handleClearFilters}>
        {CLEAR_FILTERS}
      </Button>
    </Box>
  );
};

NavClearFilters.propTypes = {
  clearOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  clearAllFilters: PropTypes.func
};
NavClearFilters.defaultProps = {
  clearOptions: {},
  clearAllFilters: noop
};

export default NavClearFilters;
