import { config } from '../../../configs';

const { constructorItemLabels } = config.labels;
const { constructorItems } = constructorItemLabels;
const { featuresLabels } = constructorItems.pocket;

export const autocompleteLabels = featuresLabels;

export const mockPositions = {
  positionsList: [
    {
      _id: '6100724bcbe2440024d73045',
      name: [
        {
          lang: 'ua',
          value: 'Ліворуч'
        },
        {
          lang: 'en',
          value: 'Left'
        }
      ],
      available: true,
      optionType: 'POSITION'
    }
  ]
};

export const mockValues = {
  positions: []
};

export const mockTouched = {
  labelIdAut: false
};

export const onChangeArg = ['positions', [mockPositions.positionsList[0]]];
