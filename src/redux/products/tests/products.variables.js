const initialLanguageValues = [
  {
    lang: 'uk',
    value: ''
  },
  {
    lang: 'en',
    value: ''
  }
];

const productModel = {
  name: initialLanguageValues,
  mainMaterial: initialLanguageValues,
  innerMaterial: initialLanguageValues,
  description: initialLanguageValues,
  closure: initialLanguageValues,
  model: initialLanguageValues,
  category: '',
  colors: [],
  pattern: [],
  basePrice: 0,
  strapLengthInCm: 0,
  available: true,
  options: []
};

const mockProductsState = {
  loading: false,
  currentPage: 0,
  productsPerPage: 9,
  sorting: {
    sortByPrice: 0,
    sortByRate: 0,
    sortByPopularity: -1
  },
  filters: {
    colorsFilter: [],
    patternsFilter: [],
    categoryFilter: [],
    searchFilter: '',
    modelsFilter: []
  },
  filterData: [],
  selectedProduct: productModel,
  productToSend: {
    ...productModel,
    model: ''
  },
  products: [],
  pagesCount: 1,
  productsError: null,
  filesToDelete: [],
  upload: [],
  primaryImageUpload: null,
  productSpecies: {
    categories: [],
    modelsForSelectedCategory: []
  },
  productOptions: {
    sizes: [],
    bottomMaterials: []
  }
};

const mockTableState = {
  dense: false,
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30],
    pagesCount: 1
  },
  itemsCount: 0
};

const mockProductsList = {
  count: 1,
  items: [
    {
      basePrice: [{ value: 146270 }, { value: 6270 }],
      category: {
        _id: 'ddc81f5dbac48c38d0403dd3',
        name: [{ value: 'Рюкзаки' }, { value: 'Backpacks' }],
        isMain: true
      },
      colors: [
        {
          name: [
            { lang: 'uk', value: 'Золотий' },
            { lang: 'en', value: 'Golden' }
          ],
          simpleName: [
            { lang: 'uk', value: 'жовтий' },
            { lang: 'en', value: 'yellow' }
          ]
        }
      ],
      images: {
        primary: {
          large: 'large_10b15c0khmaqssr_rolltop.jpg',
          medium: 'medium_10b15c0khmaqssr_rolltop.jpg',
          small: 'small_10b15c0khmaqssr_rolltop.jpg'
        }
      },
      isHotItem: true,
      model: [{ value: 'Ролтоп' }, { value: 'Rolltop' }],
      name: [
        { lang: 'uk', value: 'Ролтоп жовтий 1' },
        { lang: 'en', value: 'Rolltop Yellow 1' }
      ],
      pattern: [
        { lang: 'uk', value: 'Квіти' },
        { lang: 'en', value: 'Flowers' }
      ],
      purchasedCount: 49,
      rate: 3.375,
      _id: '7c55f47754df8cce2586da7e'
    }
  ]
};

const mockProduct = mockProductsList.items[0];

const mockFiltersData = [
  {
    ...mockProduct,
    options: [{ additions: [] }]
  }
];

const mockCategoriesList = [
  {
    _id: 'ddc81f5dbac48c38d0403dd3',
    name: [
      {
        lang: 'uk',
        value: 'Рюкзаки'
      },
      {
        lang: 'en',
        value: 'Backpacks'
      }
    ],
    isMain: true
  },
  {
    _id: '54c1cfb719f3bb97c28d762e',
    name: [
      {
        lang: 'uk',
        value: 'Сумки'
      },
      {
        lang: 'en',
        value: 'Bags'
      }
    ],
    isMain: true
  }
];

const mockProductOptions = {
  sizes: [
    {
      _id: '4cfa353a881b9fc17b3dce4f',
      name: 'S',
      heightInCm: 35,
      widthInCm: 26,
      depthInCm: 14,
      volumeInLiters: 15,
      additionalPrice: [
        {
          value: -5000,
          currency: 'UAH'
        },
        {
          value: -180,
          currency: 'USD'
        }
      ]
    }
  ],
  bottomMaterials: [
    {
      _id: '56ade69dd46eafc5968e5390',
      name: [
        {
          lang: 'uk',
          value: 'Мальмо'
        },
        {
          lang: 'en',
          value: 'Malmo'
        }
      ],
      additionalPrice: [
        {
          value: 0,
          currency: 'UAH'
        },
        {
          value: 0,
          currency: 'USD'
        }
      ]
    }
  ]
};

const mockCategoryId = mockCategoriesList[0]._id;

const mockModels = [
  {
    _id: '5fa034049a59a906f0610e42',
    name: [
      {
        value: 'Ролтоп'
      },
      {
        value: 'Rolltop'
      }
    ]
  }
];

const mockFilledProductsState = {
  ...mockProductsState,
  upload: ['some data'],
  productToSend: {
    data: 'some another data'
  }
};

const pagesCount = Math.ceil(
  mockProductsList.count / mockTableState.pagination.rowsPerPage
);

const mockProductToDelete = {
  id: mockId,
  request: true
};

const mockProductToUpdatePayload = {
  product: mockProduct,
  id: mockProduct._id
};

const mockProductToUpload = {
  ...mockProductsState,
  upload: ['some upload info'],
  primaryImageUpload: ['upload image']
};

const mockSnackarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

const mockError = {
  message: 'error'
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!'
};

const mockProductsStateToDeleteImages = {
  ...mockProductsState,
  selectedProduct: mockProduct,
  filesToDelete: ['file to delete']
};

const mockId = '5fa034049a59a906d0640e42';

export {
  mockProductsState,
  mockTableState,
  mockProductsList,
  pagesCount,
  mockFiltersData,
  mockCategoriesList,
  mockProductOptions,
  mockCategoryId,
  mockModels,
  mockFilledProductsState,
  mockProduct,
  statuses,
  mockProductToDelete,
  mockProductToUpdatePayload,
  mockProductToUpload,
  mockSnackarState,
  mockError,
  mockProductsStateToDeleteImages,
  mockId
};
