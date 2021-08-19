const mockId = '6047321793650236ddbfb841';

const mockBottoms = {
  items: [
    {
      _id: mockId,
      name: [
        {
          lang: 'ua',
          value: 'Низ'
        },
        {
          lang: 'en',
          value: 'Bottom'
        }
      ],
      optionType: 'BOTTOM',
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
      available: false
    }
  ],
  count: 6
};

export const mockBottom = {
  items: mockBottoms.items,
  count: 1
};

const filter = {
  name: 'Низ'
};

const initialFilters = {
  name: ''
};

const mockBottomsState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  bottom: null,
  bottomLoading: false,
  bottomError: null
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

const mockInputBottom = {
  id: mockId,
  bottom: mockBottom,
  image: {
    file: 'some image file'
  }
};

const mockBottomsLoadPayload = {
  limit: 1,
  skip: 0,
  filters: {
    name: ''
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
  name: ''
};

const payload = {
  limit: 10,
  skip: 0
};

export {
  mockBottomsState,
  mockBottomsLoadPayload,
  mockBottoms,
  mockId,
  mockSnackarState,
  statuses,
  mockInputBottom,
  mockError,
  mockTableState,
  filter,
  mockInitialFilters,
  payload
};
