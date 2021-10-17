const mockId = '6047321793650236ddbfb842';

const mockConstructors = {
  list: {
    items: [
      {
        _id: mockId,
        model: '6047321393650236ddbfb842',
        name: [
          {
            lang: 'ua',
            value: 'модель'
          },
          {
            lang: 'en',
            value: 'model'
          }
        ]
      }
    ]
  },
  count: 6
};

export const mockConstructor = {
  items: mockConstructors.list.items,
  count: 1
};

const filter = {
  name: 'Бонд'
};

const initialFilters = {
  name: ''
};
const mockConstructorsState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  constructor: null,
  constructorLoading: false,
  constructorError: null
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

const mockInputConstructor = {
  id: mockId,
  constructor: mockConstructor
};

const mockConstructorsLoadPayload = {
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
  mockConstructorsState,
  mockConstructorsLoadPayload,
  mockConstructors,
  mockId,
  mockSnackarState,
  statuses,
  mockInputConstructor,
  mockError,
  mockTableState,
  filter,
  mockInitialFilters,
  payload
};
