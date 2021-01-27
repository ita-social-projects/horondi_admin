const initialLanguageValues = [
  {
    lang: 'ua',
    value: ''
  },
  {
    lang: 'en',
    value: ''
  }
];

const mockColors = [
  {
    name: [
      { lang: 'ua', value: 'Золотий' },
      { lang: 'en', value: 'Golden' }
    ],
    simpleName: [
      { lang: 'ua', value: 'жовтий' },
      { lang: 'en', value: 'yellow' }
    ]
  }
];

const mockCategory = {
  _id: 'ddc81f5dbac48c38d0403dd3',
  name: [{ value: 'Рюкзаки' }, { value: 'Backpacks' }]
};

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
  sorting: {
    sortByPrice: 0,
    sortByRate: 0,
    sortByPopularity: -1
  },
  loading: false,
  filterData: [],
  upload: [],
  productSpecies: {
    categories: [],
    modelsForSelectedCategory: []
  },
  productToSend: {
    ...productModel,
    model: ''
  },
  selectedProduct: productModel,
  products: [],
  filesToDelete: [],
  primaryImageUpload: null,
  filters: {
    colorsFilter: [],
    patternsFilter: [],
    categoryFilter: [],
    searchFilter: '',
    modelsFilter: []
  },
  productsError: null
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
      category: mockCategory,
      colors: mockColors,
      images: mockPrimaryImage,
      isHotItem: true,
      model: [{ value: 'Ролтоп' }, { value: 'Rolltop' }],
      name: [
        { lang: 'ua', value: 'Ролтоп жовтий 1' },
        { lang: 'en', value: 'Rolltop Yellow 1' }
      ],
      pattern: [
        { lang: 'ua', value: 'Квіти' },
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
        lang: 'ua',
        value: 'Рюкзаки'
      },
      {
        lang: 'en',
        value: 'Backpacks'
      }
    ]
  },
  {
    _id: '54c1cfb719f3bb97c28d762e',
    name: [
      {
        lang: 'ua',
        value: 'Сумки'
      },
      {
        lang: 'en',
        value: 'Bags'
      }
    ]
  }
];

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

const mockProductsToAddState = {
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
const mockFilesToUpload = ['some upload info'];

const mockPrimaryImage = {
  primary: {
    large: 'large_10b15c0khmaqssr_rolltop.jpg',
    medium: 'medium_10b15c0khmaqssr_rolltop.jpg',
    small: 'small_10b15c0khmaqssr_rolltop.jpg'
  }
};

const mockProductToUpload = {
  ...mockProductsState,
  upload: mockFilesToUpload,
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

const mockUploadToRemoveImages = [{ name: 'image' }];

const mockId = '5fa034049a59a906d0640e42';

export {
  mockUploadToRemoveImages,
  mockPrimaryImage,
  mockCategory,
  mockColors,
  mockProductsState,
  mockTableState,
  mockProductsList,
  pagesCount,
  mockFiltersData,
  mockCategoriesList,
  mockCategoryId,
  mockModels,
  mockProductsToAddState,
  mockProduct,
  statuses,
  mockProductToDelete,
  mockProductToUpdatePayload,
  mockProductToUpload,
  mockSnackarState,
  mockError,
  mockProductsStateToDeleteImages,
  mockId,
  mockFilesToUpload
};
