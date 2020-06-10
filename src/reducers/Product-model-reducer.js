import { config } from '../config';

const { productInitialModel, sizeInitialModel } = config.product;

const initialState = {
  productModel: productInitialModel,
  sizeModel: sizeInitialModel,
  productSizes: [],
  loading: true
};

const productModelState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_MODEL':
      return {
        ...state,
        productModel: action.payload
      };

    case 'SET_SIZE_MODEL':
      return {
        ...state,
        sizeModel: action.payload
      };

    case 'SET_PRODUCT_SIZES':
      return {
        ...state,
        productSizes: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default productModelState;
