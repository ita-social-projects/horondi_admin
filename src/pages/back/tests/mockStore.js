const mockStore = {
  count: 5,
  list: [
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
        { currency: 'UAH', value: 270064 },
        { currency: 'USD', value: 9900 }
      ],
      available: true,
      customizable: null
    }
  ],
  loading: false,
  currentPage: 0,
  rowsPerPage: 10,
  itemsCount: 7
};

export default mockStore;
