const variables = {
  Categories: {
    filter: { _id: [], search: '' },
    categoriesLoading: false,
    categories: [
      {
        _id: '6043be593e06ad3edcdb7b2f',
        code: 'accessories',
        name: [
          { lang: 'ua', value: 'Аксесуари' },
          { lang: 'en', value: 'Accessories' }
        ],
        images: {
          large: 'large_9s7xejckm65k203_129210847.jpg',
          medium: 'medium_9s7xejckm65k203_129210847.jpg',
          small: 'small_9s7xejckm65k203_129210847.jpg',
          thumbnail: 'thumbnail_9s7xejckm65k203_129210847.jpg'
        },
        available: null
      }
    ],
    sort: { name: 1 },
    currentPage: 0,
    rowsPerPage: 10
  },
  Table: {
    pagination: {
      currentPage: 0,
      rowsPerPage: 10
    }
  }
};

export default variables;
