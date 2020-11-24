export const mockUsersState = {
  filters: initialFilters,
  list: [],
  sort: { name: 1 },
  tab: 0,
  user: null,
  userError: null,
  userLoading: false,
  usersCount: null
};

const initialFilters = {
  roles: ['user'],
  banned: [],
  search: ''
};

export const mockTableState = {
  dense: false,
  itemsCount: 0,
  pagination: {
    currentPage: 0,
    pagesCount: 1,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30]
  }
};

export const mockSnackarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

export const mockUsersList = {
  items: [
    {
      _id: '5fa3015e311c9429103b2853',
      firstName: 'Hook',
      lastName: 'Age',
      email: 'admintest4@gmail.com',
      role: 'admin',
      phoneNumber: null,
      banned: false
    },
    {
      _id: '5fac42bfcef414384847a019',
      firstName: 'Albina',
      lastName: 'Todoriyk',
      email: 'albinaT@gmail.com',
      role: 'user',
      phoneNumber: null,
      banned: false
    },
    {
      _id: '5fac42c0cef414384847a01b',
      firstName: 'Denis',
      lastName: 'Babarin',
      email: 'denisBB@gmail.com',
      role: 'user',
      phoneNumber: null,
      banned: false
    },
    {
      _id: '5fac42c0cef414384847a01d',
      firstName: 'Bob',
      lastName: 'Evense',
      email: 'evenseB@gmail.com',
      role: 'user',
      phoneNumber: null,
      banned: false
    },
    {
      _id: '5faced09c2f10c15f0cf536f',
      firstName: 'One',
      lastName: 'User',
      email: 'secretEmail@sec.com',
      role: 'user',
      phoneNumber: null,
      banned: false
    }
  ],
  count: 5
};

export const statuses = {
  SUCCESS_CREATION_STATUS: 'Успішно створено!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!',
  SUCCESS_CONFIRMATION_STATUS: 'Успішно підтверджено реєстрацію!'
};

export const adminInput = {
  email: 'admin@mail.com',
  role: 'admin'
};

export const mockToken = '123asd321bfd';

export const mockAdmin = { adminInput, token: mockToken };

export const mockUser = mockUsersList.items[0];

export const mockError = {
  payload: {
    message: 'error'
  }
};

export const mockStatus = statuses.SUCCESS_UPDATE_STATUS;

export const pageCount = Math.ceil(
  mockUsersList.count / mockTableState.pagination.rowsPerPage
);
