import {
    SET_SIZES,
    SET_SIZE,
    ADD_SIZE_TO_STATE,
    REMOVE_SIZE_FROM_STATE,
    SET_SIZES_LOADING,
    SET_SIZES_ERROR,
    SHOW_SIZE_DIALOG_WINDOW,
    SET_FILTER,
    CLEAR_FILTERS
} from './sizes.types';

export const selectSizes = ({Sizes}) => ({
    sizesList: Sizes.list?.items,
    loading: Sizes.sizesLoading,
    size: Sizes.size,
    filters:Sizes.filters
});

const initialFilters = {
    available: [],
    searchBySimpleName: '',
    name: []
};

export const initialState = {
    list: [],
    filters: initialFilters,
    size: null,
    showSizeDialogWindow: false,
    sizesLoading: false,
    sizeError: null
};

const sizeReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: initialFilters
            };
        case SET_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            };
        case SET_SIZES:
            return {
                ...state,
                list: action.payload
            };
        case SET_SIZE:
            return {
                ...state,
                size: action.payload
            };
        case REMOVE_SIZE_FROM_STATE: {
            const list = state.list.filter((size) => size._id !== action.payload);
            return {
                ...state,
                list
            };
        }
        case ADD_SIZE_TO_STATE: {
            const list = [...state.list];
            list.push(action.payload);
            return {
                ...state,
                list
            };
        }
        case SET_SIZES_LOADING:
            return {
                ...state,
                sizesLoading: action.payload
            };
        case SET_SIZES_ERROR:
            return {
                ...state,
                sizeError: action.payload
            };
        case SHOW_SIZE_DIALOG_WINDOW:
            return {
                ...state,
                showSizeDialogWindow: action.payload
            };
        default:
            return state;
    }
};

export default sizeReducer;
