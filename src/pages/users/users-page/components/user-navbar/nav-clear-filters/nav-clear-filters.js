import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import { useStyles } from './nav-clear-filters.styles';
import { config } from '../../../../../../configs';
import useUsersFiltering from '../../../../../../hooks/user/use-users-filtering';

const { CLEAR_FILTERS } = config.buttonTitles;

const NavClearFilters = () => {
  const { clearAllFilters } = useUsersFiltering();
  const styles = useStyles();
  const filters = useSelector(({ Users }) => Users.filters);

  const { search, ...arrayFilters } = filters;

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

export default NavClearFilters;
