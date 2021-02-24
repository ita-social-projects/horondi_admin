import React from 'react';
import { Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { useStyles } from './nav-clear-filters.styles';
import { config } from '../../../configs';

const { CLEAR_FILTERS } = config.buttonTitles;

const NavClearFilters = ({ clearOptions }) => {
  const { clearAllFilters } = clearOptions;
  const styles = useStyles();
  const { search, ...arrayFilters } = clearOptions.filters;

  const handleClearFilters = () => {
    clearAllFilters();
  };

  return (
    <Box ml={1}>
      <Button
        className={styles.clearButton}
        disabled={
          Object.values(arrayFilters).some((filter) => !filter.length) &&
          !search.trim().length
        }
        onClick={handleClearFilters}
      >
        {CLEAR_FILTERS}
      </Button>
    </Box>
  );
};

NavClearFilters.propTypes = {
  clearOptions: PropTypes.objectOf(PropTypes.object),
  filters: PropTypes.func,
  clearAllFilters: PropTypes.func
};
NavClearFilters.defaultProps = {
  clearOptions: {},
  filters: noop(),
  clearAllFilters: noop()
};
export default NavClearFilters;
