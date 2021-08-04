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
    category: 'a',
    uaName: 's',
    enName: 'd',
    uaDescription: 'f',
    enDescription: 'v',
    priority: 1
  },
  touched: {
    modelImage: 'image.jpg',
    category: 'a',
    uaName: 's',
    enName: 'd',
    uaDescription: 'd',
    enDescription: 'f',
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
    }
  ]
};

const Table = {
  pagination: {
    currentPage: 0
  }
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
  Sizes,
  Table
};
