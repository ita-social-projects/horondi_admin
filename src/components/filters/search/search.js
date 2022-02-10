import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

import { useStyles } from './search.styles';
import { config } from '../../../configs';
import { useSearch } from '../../../hooks/filter/useFilterSearchAndSort';

const {
  submitKey,
  labels: { search: setSearchLabel }
} = config;

const Search = ({ value, handler, placeholder }) => {
  const styles = useStyles();

  const { setSearch, submitSearch, activateSearch, searchValue } = useSearch(
    value,
    handler,
    submitKey
  );

  // const [searchValue, setSearchValue] = useState(value);

  // const handleSetSearchValue = (event) => {
  //   setSearchValue(event.target.value);
  // };

  // const handleSubmitSearch = (event) => {
  //   if (event.key === submitKey) {
  //     handler(searchValue);
  //   }
  // };

  // const handleSearch = () => {
  //   handler(searchValue);
  // };

  return (
    <Paper className={styles.container}>
      <InputBase
        placeholder={setSearchLabel(placeholder)}
        value={searchValue}
        onChange={setSearch}
        onKeyPress={submitSearch}
      />
      <IconButton aria-label='search' onClick={activateSearch}>
        <SearchIcon />
      </IconButton>
      {/* <InputBase
        placeholder={setSearchLabel(placeholder)}
        value={searchValue}
        onChange={handleSetSearchValue}
        onKeyPress={handleSubmitSearch}
      />
      <IconButton aria-label='search' onClick={handleSearch}>
        <SearchIcon />
      </IconButton> */}
    </Paper>
  );
};

Search.propTypes = {
  value: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

Search.defaultProps = {
  placeholder: ''
};

export default Search;
