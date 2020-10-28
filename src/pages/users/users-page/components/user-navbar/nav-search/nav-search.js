import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './nav-search.styles';
import { config } from '../../../../../../configs';
import useUsersFiltering from '../../../../../../hooks/user/use-users-filtering';

const { submitKey, labels } = config;
const { search: searchLabel } = labels;

const NavSearch = () => {
  const styles = useStyles();
  const filters = useSelector(({ Users }) => Users.filters);
  const { setSearchFilter } = useUsersFiltering();
  const { search } = filters;

  const [searchValue, setSearchValue] = useState(search);

  const handleSetSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === submitKey) {
      handleUserSearch();
    }
  };

  const handleUserSearch = () => {
    setSearchFilter(searchValue);
  };

  return (
    <div>
      <Paper className={styles.root}>
        <InputBase
          placeholder={searchLabel}
          value={searchValue}
          onChange={handleSetSearchValue}
          onKeyPress={handleSearchSubmit}
        />
        <Tooltip title={searchLabel} placement='bottom'>
          <IconButton
            className={styles.iconButton}
            aria-label='search'
            onClick={handleUserSearch}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
};

export default NavSearch;
