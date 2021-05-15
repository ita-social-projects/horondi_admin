import {useDispatch, useSelector} from 'react-redux';

import {clearFilters, setFilter} from '../../redux/comments/comments.actions';
import {setCurrentPage} from '../../redux/table/table.actions';
import titles from "../../configs/titles";
import buttonTitles from "../../configs/button-titles";
import {placeholderCommentSearch, showCommentOptions, showFilterObj} from "../../utils/comment";

const useCommentFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(({Comments}) => Comments.filters);

    const setCommentDateFromRangeFilter = (dateFrom) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setFilter({
                dateFrom
            })
        );
    };

    const setCommentDateToRangeFilter = (dateTo) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setFilter({
                dateTo
            })
        );
    };
    const setShowFilter = (show) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setFilter({
                show
            })
        );
    };
    const setSearchFilter = (search) => {
        dispatch(setCurrentPage(0));
        dispatch(
            setFilter({
                search
            })
        );
    };

    const clearAllFilters = () => {
        dispatch(setCurrentPage(0));
        dispatch(clearFilters());
    };

    return {
        filterByDateOptions: [
            {
                title: titles.historyTitles.from,
                dateHandler: setCommentDateFromRangeFilter,
                filters: filters.dateFrom
            },
            {
                title: titles.historyTitles.to,
                dateHandler: setCommentDateToRangeFilter,
                filters: filters.dateTo
            }
        ],
        filterByMultipleOptions: [
            {
                filters: filters.show,
                label: buttonTitles.USER_STATUS_TITLE,
                selectItems: showFilterObj(),
                setFilterHandler: setShowFilter,
                objForTranslateRenderItems: showCommentOptions
            }
        ],
        searchOptions: {
            search: filters.search,
            placeholderText: placeholderCommentSearch,
            setSearchFilter
        },
        clearOptions: {
            filters,
            clearAllFilters
        }
    };
};

export default useCommentFilters;
