import {
  SET_HOME_PAGE_DATA,
  SET_HOME_PAGE_DATA_LOADING,
  UPDATE_HOME_PAGE_DATA_LOCALLY,
  SET_HOME_PAGE_DATA_ERROR
} from './home.types';

export const initialState = {
  photos: [],
  homePageLoading: false,
  homePageError: null
};

const homePageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_HOME_PAGE_DATA:
    return {
      ...state,
      photos: action.payload
    };

  case UPDATE_HOME_PAGE_DATA_LOCALLY:
    return {
      ...state,
      photos: state.photos.map((photo) =>
        photo._id === action.payload.id
          ? { _id: action.payload.id, ...action.payload.upload }
          : photo
      )
    };

  case SET_HOME_PAGE_DATA_LOADING:
    return {
      ...state,
      homePageLoading: action.payload
    };

  case SET_HOME_PAGE_DATA_ERROR:
    return {
      ...state,
      homePageError: action.payload
    };

  default:
    return state;
  }
};

export default homePageReducer;
