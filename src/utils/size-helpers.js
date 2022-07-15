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
  absolutePrice:
    data.additionalPriceType === 'ABSOLUTE' ? +data.additionalPrice : null,
  relativePrice:
    data.additionalPriceType === 'RELATIVE' ? +data.additionalPrice : null
});

export const getSizeInitialValues = (size) => ({
  name: size.name || '',
  heightInCm: size.heightInCm || '',
  widthInCm: size.widthInCm || '',
  depthInCm: size.depthInCm || '',
  volumeInLiters: size.volumeInLiters || '',
  weightInKg: size.weightInKg || '',
  available: size.available || false,
  additionalPriceType: size.relativePrice ? 'RELATIVE' : 'ABSOLUTE',
  additionalPrice: size.absolutePrice
    ? size.absolutePrice
    : size.relativePrice
    ? size.relativePrice
    : ''
});

export const sizePropTypes = {
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
    )
  }),
  sizeUtils: PropTypes.shape({
    onSizeSubmit: PropTypes.func,
    onSizeDelete: PropTypes.func,
    sizesAdded: PropTypes.arrayOf(PropTypes.string)
  }),
  isEdit: PropTypes.bool
};
export const sizeDefaultProps = {
  size: {
    _id: '',
    name: '',
    heightInCm: '',
    widthInCm: '',
    depthInCm: '',
    volumeInLiters: '',
    weightInKg: '',
    available: '',
    additionalPrice: 0
  },
  sizeUtils: {
    onSizeSubmit: null,
    onSizeDelete: null,
    sizesAdded: []
  },
  isSizeEdit: false
};

export const sizeFormAccordionPropTypes = {
  ...sizePropTypes.size,
  absolutePrice: PropTypes.number,
  relativePrice: PropTypes.number
};

export const sizeFilterObj = () => {
  const arrToFilter = [];

  _.forEach(sizesEnum, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};
export const sizeAvailableObj = () => {
  const arrToFilter = [];

  _.forEach(availableEnum, (value, key) => {
    arrToFilter.push({ value: key, label: value });
  });

  return arrToFilter;
};
export const sizePlaceholderSearch = 'за назвою';
