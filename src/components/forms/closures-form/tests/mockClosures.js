const mockClosure = {
  _id: '60fed1aee3a0252140b5b79a',
  name: [
    {
      lang: 'ua',
      value: 'Чорна пластмасова'
    },
    {
      lang: 'en',
      value: 'Black plastic'
    }
  ],
  images: {
    large: 'large_3cczdzwkrm28odg_git.png',
    medium: 'medium_3cczdzwkrm28odg_git.png',
    small: 'small_3cczdzwkrm28odg_git.png',
    thumbnail: 'thumbnail_3cczdzwkrm28odg_git.png'
  },
  optionType: 'CLOSURE',
  additionalPrice: [
    {
      currency: 'UAH',
      value: 13410
    },
    {
      currency: 'USD',
      value: 500
    }
  ],
  available: true,
  customizable: null
};

const mockId = '6047321793650236ddbfb841';
const mockEdit = false;
const event = {
  target: {
    files: [new File([], 'foo,png', { type: 'image' })]
  }
};
const target = { target: { result: 'foo' } };

const mockMaterial = {
  details: {
    back: [
      {
        _id: '60edccb05167a43c603bd939',
        name: [{ value: 'Сітка' }, { value: 'Grid' }],
        colors: [
          {
            _id: '6043a9cc3e06ad3edcdb7b0e',
            name: [{ value: 'Чорний' }, { value: 'Black' }]
          }
        ]
      }
    ]
  },
  loading: false
};
const files = [new File([], 'foo,png', { type: 'image' })];
module.exports = {
  mockMaterial,
  mockClosure,
  mockId,
  mockEdit,
  event,
  target,
  files
};
