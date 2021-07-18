const mockBack = {
  available: false,
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
  _id: '',
  name: [
    {
      value: ''
    },
    {
      value: ''
    }
  ],
  images: {
    thumbnail: ''
  },
  additionalPrice: [
    { value: null, currency: '' },
    { value: null, currency: '' }
  ]
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

module.exports = {
  mockMaterial,
  mockBack,
  mockId,
  mockEdit,
  event,
  target
};
