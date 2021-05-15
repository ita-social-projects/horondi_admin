import {useDispatch, useSelector} from 'react-redux';

import {
    clearFilters,
    setFilter,
} from '../../redux/categories/categories.actions';
import {setCurrentPage} from '../../redux/table/table.actions';

const useCategoryFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(({Categories}) => Categories.filters);

    const setSearchFilter = (searchString) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setFilter({
                search: searchString
            })
        );
    };

    const clearAllFilters = () => {
        dispatch(setCurrentPage(0));
        dispatch(clearFilters());
    };
    return {
        searchOptions: {
            search: filters.search,
            setSearchFilter
        },
        clearOptions: {
            filters,
            search: filters.search,
            clearAllFilters
        }
    };
};

export default useCategoryFilters;
