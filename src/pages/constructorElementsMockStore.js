const constructorElementsMockStore = {
  items: [
    {
      _id: '60eadfb9e913fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'Бонд' },
        { lang: 'en', value: 'bond' }
      ],
      optionType: 'BACK',
      features: {
        material: {
          name: [
            { lang: 'ua', value: 'Бонд (303-318)' },
            { lang: 'en', value: 'Bond (303-318)' }
          ]
        },
        color: {
          name: [
            { lang: 'ua', value: 'Чорний' },
            { lang: 'en', value: 'Black' }
          ]
        }
      },
      images: {
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
        medium: 'medium_xds8am0kr0e5x4r_47.png',
        small: 'small_xds8am0kr0e5x4r_47.png',
        large: 'large_xds8am0kr0e5x4r_47.png'
      },
      additionalPrice: [
        { currency: 'UAH', type: 'ABSOLUTE_VALUE', value: 270064 },
        { currency: 'USD', type: 'ABSOLUTE_VALUE', value: 9900 }
      ],
      available: true,
      customizable: null
    }
  ],
  count: 3,
  loading: false,
  currentPage: 1,
  rowsPerPage: 10,
  itemsCount: 1,
  filter: {
    search: ''
  },
  constructorPartItem: {
    items: {
      _id: '60eadfb9e913fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'Бонд' },
        { lang: 'en', value: 'bond' }
      ],
      optionType: 'BOTTOM',
      features: {
        material: {
          _id: '60eadfb9e913fc3f88294bd8'
        },
        color: {
          _id: '60eadfb9e913fc3f88294bd7'
        }
      },
      images: {
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png'
      },
      absolutePrice: 10,
      additionalPriceType: 'ABSOLUTE',
      available: true
    }
  }
};

export default constructorElementsMockStore;
