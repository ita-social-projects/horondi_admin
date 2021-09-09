const mockStore = {
  count: 5,
  basicsList: [
    {
      _id: '60eadfb9e913fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'синій' },
        { lang: 'en', value: 'blue' }
      ],
      features: {
        material: {
          name: [
            { lang: 'ua', value: 'Мальмо' },
            { lang: 'en', value: 'Malmo' }
          ]
        },
        color: {
          name: [
            { lang: 'ua', value: 'Синій' },
            { lang: 'en', value: 'Blue' }
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
        { currency: 'UAH', value: 500 },
        { currency: 'USD', value: 5 }
      ],
      available: true
    }
  ],
  loading: false,
  currentPage: 0,
  rowsPerPage: 10,
  itemsCount: 7
};

export default mockStore;
