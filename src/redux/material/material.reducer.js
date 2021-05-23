import {
    SET_MATERIAL,
    SET_MATERIALS,
    SET_MATERIAL_LOADING,
    SET_MATERIAL_ERROR,
    REMOVE_MATERIAL_FROM_STORE,
    SET_MATERIALS_BY_PURPOSE, SET_MATERIAL_FILTER, CLEAR_MATERIAL_FILTERS
} from './material.types';

export const selectMaterial = ({Material}) => ({
    list: Material.list,
    loading: Material.materialLoading,
    material: Material.material,
    filters: Material.filters,
    materialsByPurpose: Material.materialsByPurpose
});

const initialFilters = {
    colors: [],
    purpose: [],
    available: [],
    name: ''
};

export const initialState = {
    list: [],
    material: null,
    materialLoading: false,
    materialError: null,
    filters: initialFilters,
    materialsByPurpose: []
};

const materialReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case CLEAR_MATERIAL_FILTERS:
            return {
                ...state,
                filters: initialFilters
            };
        case SET_MATERIALS:
            return {
                ...state,
                list: action.payload
            };
        case SET_MATERIAL:
            return {
                ...state,
                material: action.payload
            };
        case SET_MATERIAL_LOADING:
            return {
                ...state,
                materialLoading: action.payload
            };
        case SET_MATERIAL_ERROR:
            return {
                ...state,
                materialError: action.payload
            };
        case REMOVE_MATERIAL_FROM_STORE:
            const materials = state.list.filter(
                (material) => material._id !== action.payload
            );
            return {...state, list: materials};
        case SET_MATERIAL_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            };
        case SET_MATERIALS_BY_PURPOSE:
            return {
                ...state,
                materialsByPurpose: action.payload
            };
        default:
            return state;
    }
};

export default materialReducer;
