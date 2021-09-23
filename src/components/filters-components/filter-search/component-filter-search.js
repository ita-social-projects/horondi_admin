import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../../filters/search';

const ComponentFilterSearch = ({
  actionSetCurrentPage,
  actionSetSearchFilter,
  value,
  selectorFunc
}) => {
  const dispatch = useDispatch();

  const setSearchFilter = (search) => {
    dispatch(actionSetCurrentPage(0));
    dispatch(actionSetSearchFilter(selectorFunc(search)));
  };

  return <Search value={value} handler={setSearchFilter} />;
};

ComponentFilterSearch.propTypes = {
  actionSetCurrentPage: PropTypes.func.isRequired,
  actionSetSearchFilter: PropTypes.func.isRequired,
  value: PropTypes.string,
  selectorFunc: PropTypes.func.isRequired
};

ComponentFilterSearch.defaultProps = {
  value: ''
};

export default ComponentFilterSearch;
