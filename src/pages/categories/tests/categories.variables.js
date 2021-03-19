const mockStore = {
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
      },
      {
        _id: '6043bdeb3e06ad3edcdb7b2d',
        code: 'backpacks',
        name: [
          { lang: 'ua', value: 'Рюкзаки' },
          { lang: 'en', value: 'Backpacks' }
        ],
        images: {
          large: 'large_id73cf0kly0f5k7_230 (3).jpg',
          medium: 'medium_id73cf0kly0f5k7_230 (3).jpg',
          small: 'small_id73cf0kly0f5k7_230 (3).jpg',
          thumbnail: 'thumbnail_id73cf0kly0f5k7_230 (3).jpg'
        },
        available: null
      },
      {
        _id: '6043be253e06ad3edcdb7b2e',
        code: 'bags',
        name: [
          { lang: 'ua', value: 'Сумки' },
          { lang: 'en', value: 'Bags' }
        ],
        images: {
          large: 'large_id73cf0kly0ge87_204 (1).jpg',
          medium: 'medium_id73cf0kly0ge87_204 (1).jpg',
          small: 'small_id73cf0kly0ge87_204 (1).jpg',
          thumbnail: 'thumbnail_id73cf0kly0ge87_204 (1).jpg'
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

export default mockStore;
