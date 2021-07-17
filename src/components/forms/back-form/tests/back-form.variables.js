const mockBack = {
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
  additionalPrice: [
    { value: null, currency: '' },
    { value: null, currency: '' }
  ],
  available: false,
  customizable: false
};
const mockMaterial = {
  materialsByPurpose: [
    {
      _id: 1,
      name: [
        {
          value: 'Backpack'
        }
      ]
    }
  ],
  loading: false
};
const mockId = '6047321793650236ddbfb841';
const mockEdit = false;
const event = {
  target: {
    files: [new File([], 'foo,png', { type: 'image' })]
  }
};
const target = { target: { result: 'foo' } };

module.exports = {
  mockMaterial,
  mockBack,
  mockId,
  mockEdit,
  event,
  target
};
