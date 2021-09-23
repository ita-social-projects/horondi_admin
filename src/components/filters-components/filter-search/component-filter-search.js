import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../../filters/search';
import { setCurrentPage } from '../../../redux/table/table.actions';

const ComponentFilterSearch = ({ setFilterValue, value, selectorFunc }) => {
  const dispatch = useDispatch();

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(setFilterValue(selectorFunc(search)));
  };

  return <Search value={value} handler={setSearchFilter} />;
};

ComponentFilterSearch.propTypes = {
  setFilterValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  selectorFunc: PropTypes.func.isRequired
};

ComponentFilterSearch.defaultProps = {
  value: ''
};

export default ComponentFilterSearch;
