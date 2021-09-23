import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Clear from '../../filters/clear';

const ComponentFilterClear = ({ actionSetCurrentPage, actionClearFilters }) => {
  const dispatch = useDispatch();

  const clearFilters = () => {
    dispatch(actionSetCurrentPage(0));
    dispatch(actionClearFilters());
  };

  return <Clear handler={clearFilters} />;
};
ComponentFilterClear.propTypes = {
  actionSetCurrentPage: PropTypes.func.isRequired,
  actionClearFilters: PropTypes.func.isRequired
};

export default ComponentFilterClear;
