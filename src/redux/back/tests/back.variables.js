const mockId = '6047321793650236ddbfb841';

const mockBacks = {
  items: [
    {
      _id: mockId,
      name: [
        {
          lang: 'ua',
          value: 'сіра'
        },
        {
          lang: 'en',
          value: 'grey'
        }
      ],
      optionType: 'BACK',
      features: {
        material: {
          name: [
            {
              lang: 'ua',
              value: 'Бонд (303-318)'
            },
            {
              lang: 'en',
              value: 'Bond (303-318)'
            }
          ]
        },
        color: {
          name: [
            {
              lang: 'ua',
              value: 'Чорний'
            },
            {
              lang: 'en',
              value: 'Black'
            }
          ]
        }
      },
      images: {
        thumbnail: 'thumbnail_xds8878kr3mbmnu_138.png',
        medium: 'medium_xds8878kr3mbmnu_138.png',
        small: 'small_xds8878kr3mbmnu_138.png',
        large: 'large_xds8878kr3mbmnu_138.png'
      },
      additionalPrice: [
        {
          currency: 'UAH',
          value: 240057
        },
        {
          currency: 'USD',
          value: 8800
        }
      ],
      available: false,
      customizable: null
    }
  ],
  count: 1
};

export const mockBack = {
  items: mockBacks.items,
  count: 1
};

const filter = {
  name: 'Бонд'
};
const limit = 1;
const skip = 0;

const initialFilters = {
  name: '',
  model: [],
  available: [],
  material: [],
  color: []
};
const mockBacksState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  back: null,
  backLoading: false,
  backError: null
};

const mockTableState = {
  dense: false,
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30]
  },
  itemsCount: 0
};

const mockInputBack = {
  id: mockId,
  back: mockBack,
  image: {
    file: 'some image file'
  }
};

const mockBacksLoadPayload = {
  limit: 1,
  skip: 0,
  filters: {
    name: '',
    model: [],
    available: [],
    material: [],
    color: []
  }
};

const mockSnackarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!'
};

const mockError = {
  message: 'error'
};
const mockInitialFilters = {
  name: '',
  model: [],
  available: [],
  material: [],
  color: []
};

export {
  mockBacksState,
  mockBacksLoadPayload,
  mockBacks,
  mockId,
  mockSnackarState,
  statuses,
  mockInputBack,
  mockError,
  mockTableState,
  mockInitialFilters,
  filter,
  skip,
  limit
};
