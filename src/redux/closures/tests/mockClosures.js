const mockId = '60fed1aee3a0252140b5b79a';

const mockClosures = {
  items: [
    {
      _id: mockId,
      name: [
        {
          lang: 'ua',
          value: 'Чорна пластмасова'
        },
        {
          lang: 'en',
          value: 'Black plastic'
        }
      ],
      images: {
        large: 'large_3cczdzwkrm28odg_git.png',
        medium: 'medium_3cczdzwkrm28odg_git.png',
        small: 'small_3cczdzwkrm28odg_git.png',
        thumbnail: 'thumbnail_3cczdzwkrm28odg_git.png'
      },
      optionType: 'CLOSURE',
      additionalPrice: [
        {
          currency: 'UAH',
          value: 13410
        },
        {
          currency: 'USD',
          value: 500
        }
      ],
      available: true
    }
  ],
  count: 1
};
const singleClosure = {
  _id: mockId,
  name: [
    {
      lang: 'ua',
      value: 'Чорна пластмасова'
    },
    {
      lang: 'en',
      value: 'Black plastic'
    }
  ],
  images: {
    large: 'large_3cczdzwkrm28odg_git.png',
    medium: 'medium_3cczdzwkrm28odg_git.png',
    small: 'small_3cczdzwkrm28odg_git.png',
    thumbnail: 'thumbnail_3cczdzwkrm28odg_git.png'
  },
  optionType: 'CLOSURE',
  additionalPrice: [
    {
      currency: 'UAH',
      value: 13410
    },
    {
      currency: 'USD',
      value: 500
    }
  ],
  available: true
};

const mockClosure = {
  items: mockClosures.items,
  count: 1
};

const filter = {
  search: '',
  name: ''
};
const pagination = {
  limit: 1,
  skip: 0
};
const mockInitialFilters = {
  search: '',
  name: ''
};

const mockClosuresState = {
  list: [],
  filter: mockInitialFilters,
  closure: null,
  showClosuresDialogWindow: false,
  closuresLoading: false,
  closuresError: null
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

const mockInputClosure = {
  id: mockId,
  closure: mockClosure,
  image: {
    file: 'some image file'
  }
};

const mockClosuresLoadPayload = {
  limit: 1,
  skip: 0,
  filter: {
    search: ''
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

export {
  mockClosure,
  mockClosuresState,
  mockClosuresLoadPayload,
  mockClosures,
  mockId,
  mockSnackarState,
  statuses,
  mockInputClosure,
  mockError,
  mockTableState,
  filter,
  mockInitialFilters,
  pagination,
  singleClosure
};
