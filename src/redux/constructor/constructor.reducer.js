import {
  SET_CONSTRUCTORS,
  SET_CONSTRUCTOR,
  SET_CONSTRUCTOR_LOADING,
  SET_CONSTRUCTOR_ERROR,
  SET_CONSTRUCTOR_ELEMENT_METHOD,
  SET_CONSTRUCTOR_TABS,
  SET_EDITABLE_CONSTRUCTOR_ELEMENT,
  REMOVE_CONSTRUCTOR_FROM_STORE
} from './constructor.types';

export const selectConstructor = ({ Constructor }) => ({
  items: Constructor.list,
  loading: Constructor.constructorLoading,
  constructor: Constructor.constructor,
  filter: Constructor.filters,
  sort: Constructor.sort
});

const initialFilters = {
  name: ''
};

export const initialState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  constructor: null,
  constructorTabs: 0,
  constructorLoading: false,
  constructorError: null
};

const constructorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONSTRUCTOR_ELEMENT_METHOD:
      return {
        ...state,
        constructorElementMethod: action.payload
      };
    case SET_EDITABLE_CONSTRUCTOR_ELEMENT:
      return {
        ...state,
        editableConstructorElement: action.payload
      };
    case SET_CONSTRUCTOR_TABS:
      return {
        ...state,
        constructorTabs: action.payload
      };
    case SET_CONSTRUCTORS:
      return {
        ...state,
        list: action.payload
      };
    case SET_CONSTRUCTOR:
      return {
        ...state,
        constructor: action.payload
      };
    case SET_CONSTRUCTOR_LOADING:
      return {
        ...state,
        constructorLoading: action.payload
      };
    case SET_CONSTRUCTOR_ERROR:
      return {
        ...state,
        constructorError: action.payload
      };
    case REMOVE_CONSTRUCTOR_FROM_STORE:
      const constructors = state.list.filter(
        (constructor) => constructor._id !== action.payload
      );
      return {
        ...state,
        list: constructors
      };
    default:
      return state;
  }
};

export default constructorReducer;
