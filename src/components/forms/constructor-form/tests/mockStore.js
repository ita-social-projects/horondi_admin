export const restrictionsStore = {
  count: 5,
  items: [
    {
      _id: '60eadfb9e913fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'Кишеня1' },
        { lang: 'en', value: 'Pocket1' }
      ],
      images: {
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
        medium: 'medium_xds8am0kr0e5x4r_47.png',
        small: 'small_xds8am0kr0e5x4r_47.png',
        large: 'large_xds8am0kr0e5x4r_47.png'
      },
      additionalPrice: [
        { currency: 'UAH', value: 500 },
        { currency: 'USD', value: 5 }
      ],
      positions: [
        {
          _id: '60eadfb9e913fc3f88294bd9',
          name: [
            { lang: 'ua', value: 'Позиція1' },
            { lang: 'en', value: 'Position1' }
          ]
        },
        {
          _id: '60eadfb9e213fc3f88294bd9',
          name: [
            { lang: 'ua', value: 'Позиція2' },
            { lang: 'en', value: 'Position2' }
          ]
        }
      ]
    },
    {
      _id: '60eadfb9e213fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'Кишеня2' },
        { lang: 'en', value: 'Pocket2' }
      ],
      images: {
        thumbnail: 'thumbnail_xdasdkr0e5x4r_47.png',
        medium: 'medium_xdasdkr0e5x4r_47.png',
        small: 'small_xdasdkr0e5x4r_47.png',
        large: 'large_xdasdkr0e5x4r_47.png'
      },
      additionalPrice: [
        { currency: 'UAH', value: 23 },
        { currency: 'USD', value: 1 }
      ],
      positions: [
        {
          _id: '60eadfb9e911fc238294bd9',
          name: [
            { lang: 'ua', value: 'Позиція3' },
            { lang: 'en', value: 'Position3' }
          ]
        },
        {
          _id: '60eadfb9e912fc283294bd9',
          name: [
            { lang: 'ua', value: 'Позиція4' },
            { lang: 'en', value: 'Position4' }
          ]
        }
      ]
    }
  ],
  loading: false,
  currentPage: 0,
  rowsPerPage: 10,
  itemsCount: 7
};

export const elementsStore = {
  count: 5,
  items: [
    {
      _id: '60eadfb9e913fc3f28294bd9',
      name: [
        { lang: 'ua', value: 'елемент1' },
        { lang: 'en', value: 'element1' }
      ],
      images: {
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
        medium: 'medium_xds8am0kr0e5x4r_47.png',
        small: 'small_xds8am0kr0e5x4r_47.png',
        large: 'large_xds8am0kr0e5x4r_47.png'
      },
      additionalPrice: [
        { currency: 'UAH', value: 500 },
        { currency: 'USD', value: 5 }
      ],
      available: true
    },
    {
      _id: '60eadfb9e213fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'елемент2' },
        { lang: 'en', value: 'element2' }
      ],
      images: {
        thumbnail: 'thumbnail_xdasdkr0e5x4r_47.png',
        medium: 'medium_xdasdkr0e5x4r_47.png',
        small: 'small_xdasdkr0e5x4r_47.png',
        large: 'large_xdasdkr0e5x4r_47.png'
      },
      additionalPrice: [
        { currency: 'UAH', value: 23 },
        { currency: 'USD', value: 1 }
      ],
      available: false
    }
  ],
  currentPage: 0,
  rowsPerPage: 10,
  itemsCount: 7
};

export const restrictionsToAdd = [
  {
    currentPocketWithPosition: {
      pocket: {
        _id: 'asd',
        name: [
          { lang: 'ua', value: 'елемент2' },
          { lang: 'en', value: 'element2' }
        ],
        images: {
          thumbnail: 'thumbnail_xdasdkr0e5x4r_47.png'
        },
        additionalPrice: [
          { currency: 'UAH', value: 23 },
          { currency: 'USD', value: 1 }
        ]
      },
      position: {
        _id: 'asd',
        name: [
          { lang: 'ua', value: 'елемент2' },
          { lang: 'en', value: 'element2' }
        ]
      }
    }
  }
];

export const option = {
  selector: jest.fn(),
  getItems: jest.fn(),
  setOptionToAdd: jest.fn(),
  optionToAdd: [],
  label: 'element1',
  optionName: 'element1',
  isRestrictions: false
};
