import {
  SET_HOME_PAGE_DATA,
  SET_HOME_PAGE_DATA_LOADING,
  // ADD_HOME_PAGE_DATA_IN_STORE,
  UPDATE_HOME_PAGE_DATA_IN_STORE,
  // DELETE_HOME_PAGE_DATA_IN_STORE,
  SET_HOME_PAGE_DATA_ERROR
} from './home.types';

const initialState = {
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

  // case ADD_HOME_PAGE_DATA_IN_STORE:
  //   return {
  //     ...state,
  //     photos: [...state.photos, action.payload]
  //   };

  case UPDATE_HOME_PAGE_DATA_IN_STORE:
    return {
      ...state,
      photos: state.photos.map((photo) =>
        photo._id === action.payload._id
          ? action.payload.updatedPhotos
          : photo
      )
    };

  // case DELETE_HOME_PAGE_DATA_IN_STORE:
  //   return {
  //     ...state,
  //     photos: state.photos.filter((photo) => photo._id !== action.payload)
  //   };

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
