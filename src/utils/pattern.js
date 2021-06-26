import _ from 'lodash';
import { statusPatterns } from '../consts/pattern-status';

export const materialPatternTableAction = (material) => {
  const materialTable = material.map((item) => [item.id, item.name]);
  return Object.fromEntries(materialTable);
};

export const statusPatternFilterObject = statusPatterns.map(
  ({ value, label }) => ({
    key: value,
    value: label
  })
);

export const materialPatternFilterObject = (data) => {
  const arrToFilter = [];
  _.forEach(data, ({ id, name }) => {
    arrToFilter.push({ key: id, value: name });
  });
  return arrToFilter;
};

export const dataRenderObj = (data) =>
  _.mapValues(_.keyBy(data, '_id'), 'name[0].value');
