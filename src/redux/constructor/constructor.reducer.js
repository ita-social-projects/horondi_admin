import {
  SET_CONSTRUCTOR_ELEMENT_METHOD, SET_CONSTRUCTOR_TABS,
  SET_EDITABLE_CONSTRUCTOR_ELEMENT
} from './constructor.types';

export const initialState = {
  constructorElementMethod: '',
  editableConstructorElement:null,
  constructorTabs:0
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
  default:
    return state;
  }
};

export default constructorReducer;
