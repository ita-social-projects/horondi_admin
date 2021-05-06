import {useDispatch, useSelector} from 'react-redux';

import {
    setOrderSort,
    setOrderFilter,
    clearOrderFilters
} from '../../redux/orders/orders.actions';
import {setCurrentPage} from '../../redux/table/table.actions';
import titles from "../../configs/titles";
import buttonTitles from "../../configs/button-titles";
import React from "react";
import orders from "../../configs/orders";
import {paymentStatusFilterObj, statusFilterObject} from "../../utils/order";
import filterLabels from "../../configs/filter-labels";
import {sortDirection} from "../../configs/sort";

const useOrderFilters = () => {
    const dispatch = useDispatch();

    const {filters} = useSelector(({Orders}) => ({
        filters: Orders.filters,
    }));

    const setSorting = (key, type) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setOrderSort({
                [key]: sortDirection[type]
            })
        );
    };

    const setDateFromRangeFilter = (dateFrom) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setOrderFilter({
                dateFrom
            })
        );
    };

    const setDateToRangeFilter = (dateTo) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setOrderFilter({
                dateTo
            })
        );
    };

    const setSearchFilter = (search) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setOrderFilter({
                search
            })
        );
    };

    const setPaymentStatusFilter = (paymentStatus) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setOrderFilter({
                paymentStatus
            })
        );
    };

    const setStatusFilter = (status) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setOrderFilter({
                status
            })
        );
    };

    const clearAllFilters = () => {
        dispatch(setCurrentPage(0));
        dispatch(clearOrderFilters());
    };

    return {
        sortOptions: {
            labels: filterLabels.orders.sortLabels,
            setSorting
        },
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
                filters: filters.paymentStatus,
                label: buttonTitles.PAYMENT_STATUS,
                selectItems: paymentStatusFilterObj(),
                setFilterHandler: setPaymentStatusFilter,
                objForTranslateRenderItems: orders.orderTableStatus
            },
            {
                filters: filters.status,
                label: buttonTitles.STATUS,
                selectItems: statusFilterObject,
                setFilterHandler: setStatusFilter,
                objForTranslateRenderItems: orders.orderTableStatus
            }
        ],
        searchOptions: {
            search: filters.search,
            setSearchFilter
        },
        clearOptions: {
            filters,
            clearAllFilters
        }
    };
};

export default useOrderFilters;
