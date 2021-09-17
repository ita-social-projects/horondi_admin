import {
  SET_MODELS,
  SET_MODEL_LOADING,
  SET_MODEL,
  SET_MODEL_ERROR,
  SET_FILTER,
  SET_SORT,
  CLEAR_FILTERS,
  MODEL_SORT_LABEL,
  REMOVE_MODEL_FROM_STORE,
  ADD_CONSTRUCTOR_BASIC_TO_STORE,
  REMOVE_CONSTRUCTOR_BASIC_FROM_STORE,
  EDIT_CONSTRUCTOR_BASIC_IN_STORE,
  ADD_CONSTRUCTOR_BOTTOM_TO_STORE,
  REMOVE_CONSTRUCTOR_BOTTOM_FROM_STORE,
  EDIT_CONSTRUCTOR_BOTTOM_IN_STORE,
  ADD_CONSTRUCTOR_POCKET_TO_STORE,
  REMOVE_CONSTRUCTOR_POCKET_FROM_STORE,
  EDIT_CONSTRUCTOR_POCKET_IN_STORE,
  ADD_CONSTRUCTOR_PATTERN_TO_STORE,
  REMOVE_CONSTRUCTOR_PATTERN_FROM_STORE
} from './model.types';

const initialFilters = {
  available: [],
  category: [],
  availableForConstructor: [],
  search: ''
};

export const initialState = {
  list: [],
  filters: initialFilters,
  model: null,
  modelLoading: false,
  modelError: null,
  sort: {},
  sortLabel: ''
};

export const selectModel = ({ Model }) => ({
  sort: Model.sort,
  sortLabel: Model.sortLabel,
  list: Model.list,
  loading: Model.modelLoading,
  filter: Model.filters,
  model: Model.model
});

const modelReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MODELS:
      return {
        ...state,
        list: action.payload
      };
    case SET_MODEL:
      return {
        ...state,
        model: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case SET_SORT:
      return {
        ...state,
        sort: {
          ...action.payload
        }
      };
    case MODEL_SORT_LABEL:
      return {
        ...state,
        sortLabel: action.payload
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        sort: {},
        sortLabel: '',
        filters: initialFilters
      };
    case SET_MODEL_LOADING:
      return {
        ...state,
        modelLoading: action.payload
      };
    case SET_MODEL_ERROR:
      return {
        ...state,
        modelError: action.payload
      };
    case REMOVE_MODEL_FROM_STORE:
      const models = state.list.filter((model) => model._id !== action.payload);
      return { ...state, list: models };

    case ADD_CONSTRUCTOR_BASIC_TO_STORE:
      const newModelConstructorBasic = state.model;
      newModelConstructorBasic.constructorBasic.push(
        action.payload.constructorBasic
      );
      return { ...state, model: newModelConstructorBasic };

    case REMOVE_CONSTRUCTOR_BASIC_FROM_STORE:
      const deletedModelConstructorBasic = state.model;
      deletedModelConstructorBasic.constructorBasic =
        deletedModelConstructorBasic.constructorBasic.filter(
          (basic) => basic._id !== action.payload
        );
      return { ...state, model: deletedModelConstructorBasic };

    case EDIT_CONSTRUCTOR_BASIC_IN_STORE:
      const editableModelConstructorBasic = state.model;
      const editableConstructorBasicIndex =
        editableModelConstructorBasic.constructorBasic.findIndex(
          (basic) => basic._id === action.payload.constructorBasic._id
        );
      editableModelConstructorBasic.constructorBasic.splice(
        editableConstructorBasicIndex,
        1,
        action.payload.constructorBasic
      );
      return { ...state, model: editableModelConstructorBasic };

    case ADD_CONSTRUCTOR_BOTTOM_TO_STORE:
      const newModelConstructorBottom = state.model;
      newModelConstructorBottom.constructorBottom.push(
        action.payload.constructorBottom
      );
      return { ...state, model: newModelConstructorBottom };

    case REMOVE_CONSTRUCTOR_BOTTOM_FROM_STORE:
      const deletedModelConstructorBottom = state.model;
      deletedModelConstructorBottom.constructorBottom =
        deletedModelConstructorBottom.constructorBottom.filter(
          (basic) => basic._id !== action.payload
        );
      return { ...state, model: deletedModelConstructorBottom };

    case EDIT_CONSTRUCTOR_BOTTOM_IN_STORE:
      const editableModelConstructorBottom = state.model;
      const editableConstructorBottomIndex =
        editableModelConstructorBottom.constructorBottom.findIndex(
          (basic) => basic._id === action.payload.constructorBottom._id
        );
      editableModelConstructorBottom.constructorBottom.splice(
        editableConstructorBottomIndex,
        1,
        action.payload.constructorBottom
      );
      return { ...state, model: editableModelConstructorBottom };

    case ADD_CONSTRUCTOR_POCKET_TO_STORE:
      const newModelConstructorPocket = state.model;
      newModelConstructorPocket.constructorFrontPocket.push(
        action.payload.constructorFrontPocket
      );
      return { ...state, model: newModelConstructorPocket };

    case REMOVE_CONSTRUCTOR_POCKET_FROM_STORE:
      const deletedModelConstructorPocket = state.model;
      deletedModelConstructorPocket.constructorFrontPocket =
        deletedModelConstructorPocket.constructorFrontPocket.filter(
          (basic) => basic._id !== action.payload
        );
      return { ...state, model: deletedModelConstructorPocket };

    case EDIT_CONSTRUCTOR_POCKET_IN_STORE:
      const editableModelConstructorPocket = state.model;
      const editableConstructorPocketIndex =
        editableModelConstructorPocket.constructorFrontPocket.findIndex(
          (basic) => basic._id === action.payload.constructorFrontPocket._id
        );
      editableModelConstructorPocket.constructorFrontPocket.splice(
        editableConstructorPocketIndex,
        1,
        action.payload.constructorFrontPocket
      );
      return { ...state, model: editableModelConstructorPocket };

    case ADD_CONSTRUCTOR_PATTERN_TO_STORE:
      const newModelConstructorPattern = state.model;
      if (
        newModelConstructorPattern.constructorPattern.findIndex(
          (pattern) => pattern._id === action.payload.constructorPattern._id
        ) < 0
      ) {
        newModelConstructorPattern.constructorPattern.push(
          action.payload.constructorPattern
        );
      }
      return { ...state, model: newModelConstructorPattern };

    case REMOVE_CONSTRUCTOR_PATTERN_FROM_STORE:
      const deletedModelConstructorPattern = state.model;
      deletedModelConstructorPattern.constructorPattern =
        deletedModelConstructorPattern.constructorPattern.filter(
          (pattern) => pattern._id !== action.payload
        );
      return { ...state, model: deletedModelConstructorPattern };

    default:
      return state;
  }
};

export default modelReducer;
