import _ from 'lodash';

export const availableOptions = {
  true: 'Доступні',
  false: 'Не доступні'
};

export const availableForConstructorOptions = {
  true: 'Доступні',
  false: 'Не доступні'
};

export const categoryOptions = {};

export const convertToCatOptions = (categories) => {
  categories.map((category) =>
    Object.assign(categoryOptions, { [category._id]: category.name[0].value })
  );
  return categoryOptions;
};

export const placeholderModelSearch = 'по тексту';
export const categoryFilterObj = () => {
  const arrToFilter = [];
  _.forEach(categoryOptions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};

export const availableFilterObj = () => {
  const arrToFilter = [];

  _.forEach(availableOptions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};

export const availableForConstructorFilterObj = () => {
  const arrToFilter = [];

  _.forEach(availableForConstructorOptions, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
