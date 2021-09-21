import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../../../../components/filters/search';
import { setOrderFilter } from '../../../../redux/orders/orders.actions';
import { setCurrentPage } from '../../../../redux/table/table.actions';

const FilterSearch = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(({ Orders }) => Orders);

  const setSearchFilter = (search) => {
    dispatch(setCurrentPage(0));
    dispatch(
      setOrderFilter({
        search
      })
    );
  };

  return <Search value={filters.search} handler={setSearchFilter} />;
};

export default FilterSearch;
