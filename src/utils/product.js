import _ from 'lodash';

export const placeholderProductSearch = 'за назвою';
export const dataFilterObj = (data) => {
  const arrToFilter = [];
  _.forEach(data, (value) => {
    arrToFilter.push({ key: value?._id, value: value?.name[0].value });
  });
  return arrToFilter;
};

export const filterCategoryByModel = (haystack = [], needle = []) => {
  const arrToFilter = [];
  const result = needle.length
    ? haystack.filter((el) =>
        el.models.some((model) => needle.some((f) => f === model._id))
      )
    : haystack;

  _.forEach(result, (value) => {
    arrToFilter.push({ key: value?._id, value: value?.name[0].value });
  });
  return arrToFilter;
};

export const filterModelByCategory = (haystack = [], needle = []) => {
  const arrToFilter = [];
  const result = needle.length
    ? haystack.filter((el) => needle.some((f) => f === el.category._id))
    : haystack;
  _.forEach(result, (value) => {
    arrToFilter.push({ key: value?._id, value: value?.name[0].value });
  });
  return arrToFilter;
};

export const dataRenderObj = (data) =>
  _.mapValues(_.keyBy(data, '_id'), 'name[0].value');
