import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Clear from '../../filters/clear';
import { setCurrentPage } from '../../../redux/table/table.actions';

const ComponentFilterClear = ({ actionClearFilters }) => {
  const dispatch = useDispatch();

  const clearFilters = () => {
    dispatch(setCurrentPage(0));
    dispatch(actionClearFilters());
  };

  return <Clear handler={clearFilters} />;
};
ComponentFilterClear.propTypes = {
  actionClearFilters: PropTypes.func.isRequired
};

export default ComponentFilterClear;
