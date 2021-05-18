import _ from 'lodash';

export const placeholderProductSearch = 'за назвою';
export const dataFilterObj = (data) => {
  const arrToFilter = [];

  _.forEach(data, (value) => {
    arrToFilter.push({ key: value?._id, value: value?.name[0].value });
  });
  return arrToFilter;
};

export const dataRenderObj = (data) => _.mapValues(_.keyBy(data, '_id'), 'name[0].value');
