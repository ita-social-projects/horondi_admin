const mockId = '6047321793650236ddbfb841';

const mockBasics = {
  list: {
    items: [
      {
        _id: mockId,
        name: [
          {
            lang: 'ua',
            value: 'сірий'
          },
          {
            lang: 'en',
            value: 'grey'
          }
        ],
        optionType: 'BASICS',
        features: {
          material: {
            name: [
              {
                lang: 'ua',
                value: 'Мальмо'
              },
              {
                lang: 'en',
                value: 'Malmo'
              }
            ]
          },
          color: {
            name: [
              {
                lang: 'ua',
                value: 'Сірий'
              },
              {
                lang: 'en',
                value: 'Grey'
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
            value: 500
          },
          {
            currency: 'USD',
            value: 5
          }
        ],
        available: false,
        customizable: null
      }
    ]
  },
  count: 6
};

export const mockBasic = {
  items: mockBasics.list.items,
  count: 1
};

const filter = {
  name: 'Бонд'
};

const initialFilters = {
  name: '',
  available: [],
  material: [],
  color: []
};
const mockBasicsState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  basic: null,
  basicLoading: false,
  basicError: null
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

const mockInputBasic = {
  id: mockId,
  basic: mockBasic,
  image: {
    file: 'some image file'
  }
};

const mockBasicsLoadPayload = {
  limit: 1,
  skip: 0,
  filters: {
    name: '',
    available: [],
    material: [],
    color: []
  }
  // basicsPerPage: 10
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
  available: [],
  material: [],
  color: []
};

const payload = {
  limit: 10,
  skip: 0
};

export {
  mockBasicsState,
  mockBasicsLoadPayload,
  mockBasics,
  mockId,
  mockSnackarState,
  statuses,
  mockInputBasic,
  mockError,
  mockTableState,
  filter,
  mockInitialFilters,
  payload
};
