export const mockStore = {
  count: 5,
  list: [
    {
      _id: '60eadfb9e913fc288294bd9',
      name: [
        { lang: 'ua', value: 'синій' },
        { lang: 'en', value: 'blue' }
      ],
      images: {
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
        medium: 'medium_xds8am0kr0e5x4r_47.png',
        small: 'small_xds8am0kr0e5x4r_47.png',
        large: 'large_xds8am0kr0e5x4r_47.png'
      },
      available: true,
      availableForConstructor: true
    },
    {
      _id: '60eadfb9e913fc2882949',
      name: [
        { lang: 'ua', value: 'синій' },
        { lang: 'en', value: 'blue' }
      ],
      images: {
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
        medium: 'medium_xds8am0kr0e5x4r_47.png',
        small: 'small_xds8am0kr0e5x4r_47.png',
        large: 'large_xds8am0kr0e5x4r_47.png'
      },
      available: true,
      availableForConstructor: true
    }
  ],
  model: {
    _id: '60eadfb9e913fc288294bd9',
    name: [
      { lang: 'ua', value: 'синій' },
      { lang: 'en', value: 'blue' }
    ],
    images: {
      thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
      medium: 'medium_xds8am0kr0e5x4r_47.png',
      small: 'small_xds8am0kr0e5x4r_47.png',
      large: 'large_xds8am0kr0e5x4r_47.png'
    },
    available: true
  },
  items: [
    {
      _id: '60eadfb9e913fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'синій' },
        { lang: 'en', value: 'blue' }
      ],
      model: {
        _id: '60eadfb9e913fc3f88294bd9',
        images: {
          thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
          medium: 'medium_xds8am0kr0e5x4r_47.png',
          small: 'small_xds8am0kr0e5x4r_47.png',
          large: 'large_xds8am0kr0e5x4r_47.png'
        }
      },
      images: {
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
        medium: 'medium_xds8am0kr0e5x4r_47.png',
        small: 'small_xds8am0kr0e5x4r_47.png',
        large: 'large_xds8am0kr0e5x4r_47.png'
      },
      available: true,
      additionalPrice: [
        { currency: 'UAH', value: 500 },
        { currency: 'USD', value: 5 }
      ],
      positions: ['60eadfb9e911fc288294bd9', '60eadfb9e912fc288294bd9']
    }
  ],
  loading: false,
  currentPage: 0,
  rowsPerPage: 10,
  itemsCount: 7
};

export const initialState = {
  Constructor: {
    constructor: {
      _id: '6366445a0e8c5684b99d4c81',
      model: {
        _id: '6043bf9e3e06ad3edcdb7b30',
        name: [
          {
            lang: 'ua',
            value: 'Роллтоп'
          },
          {
            lang: 'en',
            value: 'Rolltop'
          }
        ]
      },
      name: [
        {
          lang: 'ua',
          value: 'Роллтоп'
        },
        {
          lang: 'en',
          value: 'Rolltop'
        }
      ],
      bottoms: [
        {
          _id: '619e937b5bbfb0002540b7b9'
        }
      ],
      basics: [
        {
          _id: '619eb9a45bbfb0002540bf96'
        }
      ],
      patterns: [
        {
          _id: '619e24c25bbfb00025409bf3'
        }
      ],
      backs: [
        {
          _id: '60e71ce82d34d70024decb74'
        }
      ],
      straps: [],
      closures: [],
      pockets: [],
      basePrice: 14
    }
  }
};
