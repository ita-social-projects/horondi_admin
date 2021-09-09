const mockBasic = {
  _id: '',
  name: [
    {
      value: ''
    },
    {
      value: ''
    }
  ],
  features: {
    material: {
      name: [
        {
          value: ''
        },
        {
          value: ''
        }
      ]
    },
    color: {
      name: [
        {
          value: ''
        },
        {
          value: ''
        }
      ]
    }
  },
  images: {
    thumbnail: ''
  },
  additionalPrice: [
    { value: null, currency: '' },
    { value: null, currency: '' }
  ],
  available: false
};

const mockId = '6047321793650236ddbfb842';
const mockEdit = false;
const event = {
  target: {
    files: [new File([], 'foo,png', { type: 'image' })]
  }
};
const target = {
  target: {
    result: 'foo'
  }
};

const mockMaterial = {
  details: {
    main: [
      {
        _id: '60edccb05167a43c603bd931',
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
  mockBasic,
  mockId,
  mockEdit,
  event,
  target,
  files
};
