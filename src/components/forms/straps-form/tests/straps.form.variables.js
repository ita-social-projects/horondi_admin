const target = { target: { result: 'foo' } };
const files = [new File([], 'foo.png', { type: 'image' })];
const mockColor = {
  colorsList: {},
  loadingPositions: false
};
const mockColorsWithData = {
  colorsList: [
    {
      _id: '604394a2a7532c33dcb326d5',
      name: 'Червоний'
    }
  ],
  loadingColors: false
};
const Straps = {
  list: [
    {
      _id: '',
      name: [
        {
          lang: '',
          value: ''
        },
        {
          lang: '',
          value: ''
        }
      ],
      image: '',
      optionType: null,
      additionalPrice: [
        { value: null, currency: '' },
        { value: null, currency: '' }
      ],
      features: {
        color: { _id: '' }
      },
      available: false
    }
  ]
};

module.exports = {
  mockColorsWithData,
  Straps,
  mockColor,
  target,
  files
};
