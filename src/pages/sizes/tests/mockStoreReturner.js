const mockStoreReturner = (mockLoading) => ({
  Sizes: {
    list: [
      {
        _id: '604394cba7532c33dcb326d6',
        name: 'M',
        modelId: {
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
        heightInCm: 30,
        widthInCm: 27,
        depthInCm: 13,
        volumeInLiters: 22,
        weightInKg: 1,
        available: true,
        additionalPrice: [
          {
            value: 138746,
            currency: 'UAH'
          },
          {
            value: 5000,
            currency: 'USD'
          }
        ]
      }
    ],
    sizesLoading: mockLoading,
    size: null,
    filters: {
      available: [],
      searchBySimpleName: '',
      name: []
    }
  },
  Table: {
    pagination: {
      currentPage: 0,
      rowsPerPage: 10
    },
    itemsCount: 1
  }
});

export default mockStoreReturner;
