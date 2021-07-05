import PropTypes from 'prop-types';
import _ from 'lodash';
import sizesEnum, { availableEnum } from '../configs/sizes-enum';

export const createSize = (data) => ({
  name: data.name,
  heightInCm: data.heightInCm,
  widthInCm: data.widthInCm,
  depthInCm: data.depthInCm,
  volumeInLiters: data.volumeInLiters,
  weightInKg: data.weightInKg,
  available: data.available,
  additionalPrice: data.additionalPrice,
  modelId: data.modelId
});

export const getSizeInitialValues = (size) => ({
  name: size.name || 'M',
  modelId: size.modelId._id || '',
  model: size.modelId || {},
  heightInCm: size.heightInCm || '',
  widthInCm: size.widthInCm || '',
  depthInCm: size.depthInCm || '',
  volumeInLiters: size.volumeInLiters || '',
  weightInKg: size.weightInKg || '',
  available: size.available || false,
  additionalPrice: size.additionalPrice[1].value / 100 || 0
});

export const sizePropTypes = {
  id: PropTypes.string,
  size: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    heightInCm: PropTypes.number,
    widthInCm: PropTypes.number,
    depthInCm: PropTypes.number,
    volumeInLiters: PropTypes.number,
    weightInKg: PropTypes.number,
    available: PropTypes.bool,
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    ),
    modelId: PropTypes.string
  })
};
export const sizeDefaultProps = {
  id: '',
  size: {
    _id: '',
    name: '',
    modelId: '',
    heightInCm: '',
    widthInCm: '',
    depthInCm: '',
    volumeInLiters: '',
    weightInKg: '',
    available: '',
    additionalPrice: [
      {
        value: 0
      },
      {
        value: 0
      }
    ]
  }
};
export const sizeFilterObj = () => {
  const arrToFilter = [];

  _.forEach(sizesEnum, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
export const sizeAvailableObj = () => {
  const arrToFilter = [];

  _.forEach(availableEnum, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
export const sizePlaceholderSearch = 'за назвою';
