import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import { useStyles } from './Table-nav-searchbar-style';

import { setSearchValue, setSearchTerm } from '../../actions';

const placeHolder = 'Search...';
const inputProps = { 'aria-label': 'search' };
const searchClear = '';
const submitKey = 'Enter';

const TableNavSearchBar = ({ searchValue, setSearchValue, setSearchTerm }) => {
  const classes = useStyles();

  useEffect(() => () => setSearchTerm(searchClear), [setSearchTerm]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === submitKey) {
      setSearchTerm(searchValue);
      setSearchValue(searchClear);
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeHolder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={inputProps}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyPress={handleSearchSubmit}
      />
    </div>
  );
};

const mapStateToProps = ({ searchState: { searchValue } }) => ({
  searchValue
});
const mapDispatchToProps = {
  setSearchValue,
  setSearchTerm
};

export default connect(mapStateToProps, mapDispatchToProps)(TableNavSearchBar);
