import { config } from '../../../configs';

const { constructorItemLabels } = config.labels;
const { constructorItems } = constructorItemLabels;
const { featuresLabels } = constructorItems.pocket;

export const autocompleteLabels = featuresLabels;

export const mockPositions = {
  positionsList: ['one', 'two']
};

export const mockValues = {
  positions: []
};
export const mockTouched = {
  labelIdAut: false
};

// {
//   _id: '6100724bcbe2440024d73045',
//   name: [
//     {
//       lang: 'ua',
//       value: 'Ліворуч'
//     },
//     {
//       lang: 'en',
//       value: 'Left'
//     }
//   ],
//   available: true,
//   optionType: 'POSITION'
// }
