import {useDispatch, useSelector} from 'react-redux';

import {
    setHistoryFilter,
    clearHistoryFilters
} from '../../redux/history/history.actions';
import {setCurrentPage} from '../../redux/table/table.actions';
import {
    actionFilterObj,
    placeholderText,
    roleFilterObject,
    userRolesForFilter
} from '../../utils/history';
import titles from "../../configs/titles";
import buttonTitles from "../../configs/button-titles";
import React, {useState} from "react";
import {historyActions} from "../../consts/history-actions";

const useHistoryFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(({History}) => History.filters);
    const [searchValue, setSearchValue] = useState('');

    const handleSetSearchValue = (event) => {
        setSearchValue(event?.target?.value);
    };

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
                label: buttonTitles.EVENT_TITLE,
                selectItems: actionFilterObj(),
                setFilterHandler: setActionsFilter,
                objForTranslateRenderItems: historyActions
            },
            {
                filters: filters.role,
                label: buttonTitles.USER_ROLE_TITLE,
                selectItems: roleFilterObject,
                setFilterHandler: setRolesFilter,
                objForTranslateRenderItems: userRolesForFilter
            }
        ],
        searchOptions: {
            search:filters.search,
            handleSetSearchValue,
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
