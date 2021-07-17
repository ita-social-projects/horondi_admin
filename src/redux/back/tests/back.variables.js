const mockId = '6047321793650236ddbfb841';

const mockBacks = {
  items: [
    {
      _id: mockId,
      name: [
        {
          lang: 'ua',
          value: 'Бонд '
        },
        {
          lang: 'en',
          Value: 'Bond'
        }
      ],
      available: false,
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
        thumbnail: 'thumbnail_xds8am0kr0e5x4r_47.png'
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
      ]
    }
  ],
  count: 1
};

const mockBack = mockBacks.items[0];

const filter = {
  search: 'Бонд'
};
const mockBacksState = {
  list: [],
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
  skip: 0,
  limit: 10,
  filters: {
    name: '',
    model: [],
    available: [],
    material: [],
    color: []
  },
  backsPerPage: 10
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
  search: '',
  dateFrom: '',
  dateTo: '',
  show: []
};
export {
  mockBacksState,
  mockBacksLoadPayload,
  mockBacks,
  mockId,
  mockBack,
  mockSnackarState,
  statuses,
  mockInputBack,
  mockError,
  mockTableState,
  filter,
  mockInitialFilters
};
