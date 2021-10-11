const mockStore = {
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
      available: true
    }
  ],
  items: [
    {
      _id: '60eadfb9e913fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'синій' },
        { lang: 'en', value: 'blue' }
      ],
      model: {
        images: {
          thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png',
          medium: 'medium_xds8am0kr0e5x4r_47.png',
          small: 'small_xds8am0kr0e5x4r_47.png',
          large: 'large_xds8am0kr0e5x4r_47.png'
        }
      },
      available: true
    },
    {
      _id: '60eadfb9e912fc3f88294bd9',
      name: [
        { lang: 'ua', value: 'без картинки' },
        { lang: 'en', value: 'withoutimage' }
      ],
      model: {
        images: {
          medium: 'medium_xds8am0kr0e5x4r_47.png',
          small: 'small_xds8am0kr0e5x4r_47.png',
          large: 'large_xds8am0kr0e5x4r_47.png'
        }
      },
      available: true
    }
  ],
  loading: false,
  currentPage: 0,
  rowsPerPage: 10,
  itemsCount: 7
};

export default mockStore;
