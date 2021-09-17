const target = { target: { result: 'foo' } };

const files = [new File([], 'foo,png', { type: 'image' })];

const mockPosition = {
  positionsList: {},
  loadingPositions: false
};

const mockPositionWithData = {
  positionsList: [
    {
      _id: '604394a2a7532c33dcb326d5',
      name: 'L',
      modelId: {
        _id: '6043bf9e3e06ad3edcdb7b30',
        name: [
          {
            value: 'Роллтоп',
            lang: 'ua'
          },
          {
            value: 'Rolltop',
            lang: 'en'
          }
        ]
      },
      available: false
    }
  ],
  loadingPositions: false
};
const Pockets = {
  list: [
    {
      _id: '604394a2a7532c33dcb326d5',
      name: 'L',
      modelId: {
        _id: '6043bf9e3e06ad3edcdb7b30',
        name: [
          {
            value: 'Кишеня',
            lang: 'ua'
          },
          {
            value: 'pocket',
            lang: 'en'
          }
        ]
      },
      available: false
    }
  ]
};

module.exports = {
  mockPositionWithData,
  Pockets,
  mockPosition,
  target,
  files
};
