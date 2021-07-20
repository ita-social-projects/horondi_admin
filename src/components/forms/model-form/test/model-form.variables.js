const mockDefaultProps = {
  id: '6043c1223e06ad3edcdb7b31',
  match: { params: { id: '6043c1223e06ad3edcdb7b31' } },
  values: {
    modelImage: 'image.jpg',
    category: 'a',
    uaName: 's',
    enName: 'd',
    uaDescription: 'f',
    enDescription: 'g',
    priority: 1,
    show: true
  },
  errors: {
    modelImage: 'image.jpg',
    category: '',
    uaName: '',
    enName: '',
    uaDescription: '',
    enDescription: '',
    priority: 1
  },
  touched: {
    modelImage: 'image.jpg',
    category: '',
    uaName: '',
    enName: '',
    uaDescription: '',
    enDescription: '',
    priority: 1
  },
  model: {
    _id: '6043c1223e06ad3edcdb7b31',
    name: [
      {
        lang: 'ua',
        value: 'Гарбуз'
      },
      {
        lang: 'en',
        value: 'Pumpkin'
      }
    ],
    description: [
      {
        value:
          '<p>Крутий рюкзак який класно підійде для прогулянки містом та подорожей</p>',
        lang: 'ua'
      },
      {
        value:
          '<p>A cool backpack that is great for walking around the city and traveling</p>',
        lang: 'en'
      }
    ],
    images: {
      thumbnail: 'image.jpg'
    },
    category: {
      _id: '26043bdeb3e06ad3edcdb7b2d13',
      images: {
        thumbnail: 'image.jpg'
      },
      name: [
        {
          value: 'Рюкзаки ',
          lang: 'ua'
        },
        {
          value: 'Backpacks',
          lang: 'en'
        }
      ],
      code: ''
    },
    sizes: [
      {
        _id: '604394a2a7532c33dcb326d5',
        name: 'L',
        modelId: {
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
      },
      {
        _id: '604394cba7532c33dcb326d6',
        name: 'M',
        modelId: {
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
        available: true
      },
      {
        _id: '60439516a7532c33dcb326d7',
        name: 'S',
        modelId: {
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
        available: true
      }
    ],
    show: true,
    availableForConstructor: true,
    priority: 1
  },
  isEdit: true
};
const Categories = {
  categories: [
    {
      _id: '6043be253e06ad3edcdb7b2e',
      code: 'bags',
      name: [
        {
          lang: 'ua',
          value: 'Сумки '
        },
        {
          lang: 'en',
          value: 'Bags'
        }
      ],
      images: {
        large: 'large_4051pm10kokdt84z_bags.jpg',
        medium: 'medium_4051pm10kokdt84z_bags.jpg',
        small: 'small_4051pm10kokdt84z_bags.jpg',
        thumbnail: 'thumbnail_4051pm10kokdt84z_bags.jpg'
      },
      available: null
    },
    {
      _id: '6043bdeb3e06ad3edcdb7b2d',
      code: 'backpacks',
      name: [
        {
          lang: 'ua',
          value: 'Рюкзаки '
        },
        {
          lang: 'en',
          value: 'Backpacks'
        }
      ],
      images: {
        large: 'large_4051pm10kokdvdj5_backpacks.jpg',
        medium: 'medium_4051pm10kokdvdj5_backpacks.jpg',
        small: 'small_4051pm10kokdvdj5_backpacks.jpg',
        thumbnail: 'thumbnail_4051pm10kokdvdj5_backpacks.jpg'
      },
      available: null
    },
    {
      _id: '6048f900fc3c0b3b34fd4992',
      code: 'accessories',
      name: [
        {
          lang: 'ua',
          value: 'Аксесуари'
        },
        {
          lang: 'en',
          value: 'Accesories'
        }
      ],
      images: {
        large: 'large_4051pm10kokdski7_accessories.jpg',
        medium: 'medium_4051pm10kokdski7_accessories.jpg',
        small: 'small_4051pm10kokdski7_accessories.jpg',
        thumbnail: 'thumbnail_4051pm10kokdski7_accessories.jpg'
      },
      available: null
    }
  ]
};

const Sizes = {
  list: [
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
    },
    {
      _id: '604395c9a7532c33dcb326d9',
      name: 'L',
      modelId: {
        _id: '6043c1983e06ad3edcdb7b32',
        name: [
          {
            value: 'Новий',
            lang: 'ua'
          },
          {
            value: 'New',
            lang: 'en'
          }
        ]
      },
      available: true
    },
    {
      _id: '60439642a7532c33dcb326da',
      name: 'M',
      modelId: {
        _id: '6043c1983e06ad3edcdb7b32',
        name: [
          {
            value: 'Новий',
            lang: 'ua'
          },
          {
            value: 'New',
            lang: 'en'
          }
        ]
      },
      available: true
    },
    {
      _id: '60467e30873045422c1dbf91',
      name: 'S',
      modelId: {
        _id: '60467f00873045422c1dbf92',
        name: [
          {
            value: 'Бананки',
            lang: 'ua'
          },
          {
            value: 'Banana Bags',
            lang: 'en'
          }
        ]
      },
      available: true
    },
    {
      _id: '604395a8a7532c33dcb326d8',
      name: 'M',
      modelId: {
        _id: '60467dfd873045422c1dbf90',
        name: [
          {
            value: 'Гаманець шкіряний з гобеленом',
            lang: 'ua'
          },
          {
            value: 'Wallet',
            lang: 'en'
          }
        ]
      },
      available: true
    },
    {
      _id: '60439516a7532c33dcb326d7',
      name: 'S',
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
      available: true
    },
    {
      _id: '604787abfc3c0b3b34fd485a',
      name: 'M',
      modelId: {
        _id: '60ba9acbba1b8596281cea18',
        name: [
          {
            value: 'Сумка',
            lang: 'ua'
          },
          {
            value: 'Bag',
            lang: 'en'
          }
        ]
      },
      available: true
    },
    {
      _id: '60467d0b873045422c1dbf8f',
      name: 'M',
      modelId: {
        _id: '6043c1223e06ad3edcdb7b31',
        name: [
          {
            value: 'Гарбуз',
            lang: 'ua'
          },
          {
            value: 'Pumpkin',
            lang: 'en'
          }
        ]
      },
      available: true
    },
    {
      _id: '604394cba7532c33dcb326d6',
      name: 'M',
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
      available: true
    },
    {
      _id: '6043966ea7532c33dcb326db',
      name: 'L',
      modelId: {
        _id: '6043c1223e06ad3edcdb7b31',
        name: [
          {
            value: 'Гарбуз',
            lang: 'ua'
          },
          {
            value: 'Pumpkin',
            lang: 'en'
          }
        ]
      },
      available: true
    }
  ]
};

module.exports = {
  mockId: mockDefaultProps.id,
  mockMatch: mockDefaultProps.match,
  mockValues: mockDefaultProps.values,
  mockErrors: mockDefaultProps.errors,
  mockTouched: mockDefaultProps.touched,
  mockModel: mockDefaultProps.model,
  mockIsEdit: mockDefaultProps.isEdit,
  Categories,
  Sizes
};
