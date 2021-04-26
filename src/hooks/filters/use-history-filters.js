import {useDispatch, useSelector} from 'react-redux';

import {
    setHistoryFilter,
    clearHistoryFilters
} from '../../redux/history/history.actions';
import {setCurrentPage} from '../../redux/table/table.actions';
import {placeholderText} from '../../utils/history';
import titles from "../../configs/titles";

const useHistoryFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(({History}) => History.filters);

    const setDateFromRangeFilter = (dateFrom) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setHistoryFilter({
                dateFrom
            })
        );
    };

    const setDateToRangeFilter = (dateTo) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setHistoryFilter({
                dateTo
            })
        );
    };

    const setSearchFilter = (fullName) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setHistoryFilter({
                search: fullName
            })
        );
    };

    const setActionsFilter = (action) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setHistoryFilter({
                action
            })
        );
    };

    const setRolesFilter = (role) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setHistoryFilter({
                role
            })
        );
    };

    const clearAllFilters = () => {
        dispatch(setCurrentPage(0));
        dispatch(clearHistoryFilters());
    };

    return {
        filterByDateOptions: [
            {
                title: titles.historyTitles.from,
                dateHandler: setDateFromRangeFilter,
                filters: filters.dateFrom
            },
            {
                title: titles.historyTitles.to,
                dateHandler: setDateToRangeFilter,
                filters: filters.dateTo
            }
        ],
        filterByMultipleOptions: [
            {
                filters: filters.action,
            },
            {}
        ],
        searchOptions: {
            search: filters.search,
            placeholderText,
            setSearchFilter
        },
        clearOptions: {
            filters,
            clearAllFilters
        }
    };
};

export default useHistoryFilters;
