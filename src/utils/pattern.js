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

export const materialPatternFilterObject = (material) =>
  material.map(({ id, name }) => ({
    key: id,
    value: name
  }));

export const placeholderPatternSearch = 'за назвою';
export const dataFilterObj = (data) => {
  const test = [
    { id: '6043a1f33e06ad3edcdb7b09', name: 'Мальмо' },
    { id: '6043b2ec3e06ad3edcdb7b17', name: 'Нитки для шиття' }
  ];
  const arrToFilter = [];
  console.log();
  _.forEach(test, ({ id, name }) => {
    arrToFilter.push({ key: id, value: name });
  });

  return arrToFilter;
};

export const dataRenderObj = (data) =>
  _.mapValues(_.keyBy(data, '_id'), 'name[0].value');
