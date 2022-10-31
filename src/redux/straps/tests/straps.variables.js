export const actionsPayload = ['custom payload'];
export const filter = { name: 'abc', color: [], available: [] };
export const cleanFilter = { name: '', color: [], available: [] };
export const mockId = '5fa034049a59a906f0610e42';
export const mockStrapsState = {
  list: [],
  strap: null,
  strapsLoading: false,
  strapsError: null
};
export const mockTableState = {
  dense: false,
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30]
  },
  itemsCount: 0
};
export const mockSnackbarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};
export const mockStrapsLoadPayload = {
  strapsPerPage: 6,
  pagination: {
    limit: 6,
    skip: 0
  },
  filter: {
    name: ''
  }
};
export const mockStraps = {
  items: [
    {
      _id: mockId,
      features: {
        color: {
          _id: 'asdsaxccqcq12xcasc'
        }
      },
      name: [
        {
          lang: 'ua',
          value: 'Рюкзаки'
        },
        {
          lang: 'en',
          value: 'Backpacks'
        }
      ],
      image: 'small_10b1e9gkhm8gn4h_rolltop.jpg',
      available: true
    }
  ],
  count: 1
};
export const mockStrap = mockStraps.items[0];
export const strapFromState = { Straps: { list: mockStraps } };
export const mockError = {
  message: 'error'
};
export const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!'
};
export const mockStrapToUpdate = {
  id: mockId,
  model: mockStrap,
  image: ['image']
};
export const pagesCount = Math.ceil(
  mockStraps.count / mockStrapsLoadPayload.strapsPerPage
);
