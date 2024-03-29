import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { useStyles } from './nav-search.styles';
import { config } from '../../../configs';
import { useSearch } from '../../../hooks/filter/useFilterSearchAndSort';

const { submitKey, labels } = config;
const { search: searchLabel } = labels;

const NavSearch = ({
  searchOptions: { search, setSearchFilter, placeholderText = '' }
}) => {
  const styles = useStyles();

  const { setSearch, submitSearch, activateSearch, searchValue } = useSearch(
    search,
    setSearchFilter,
    submitKey
  );

  return (
    <div>
      <Paper className={styles.root}>
        <InputBase
          placeholder={searchLabel(placeholderText)}
          value={searchValue}
          onChange={setSearch}
          onKeyPress={submitSearch}
        />
        <Tooltip title={searchLabel()} placement='bottom'>
          <IconButton
            data-testid='search'
            className={styles.iconButton}
            aria-label='search'
            onClick={activateSearch}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
};
NavSearch.propTypes = {
  searchOptions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  ),
  search: PropTypes.string,
  setSearchFilter: PropTypes.func,
  placeholderText: PropTypes.string
};

NavSearch.defaultProps = {
  searchOptions: {},
  search: '',
  placeholderText: '',
  setSearchFilter: noop
};
export default NavSearch;
