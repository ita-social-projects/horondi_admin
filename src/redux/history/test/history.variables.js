export const historyId = '6070d0c7cb643400241bf5ed';

export const historyRecord = {
  _id: historyId,
  subject: {
    model: '',
    name: 'Аксесуари нові',
    subjectId: '6048f900fc3c0b3b34fd4992'
  },
  valueBeforeChange: [{ value: 'Аксесуари' }],
  valueAfterChange: [{ value: 'Аксесуари нові' }],
  createdAt: '2021-04-09T19:15:43.674+00:00',
  action: 'EDIT_CATEGORY',
  userId: '60452208873045422c1dbef8'
};

export const mockHistoryRecords = {
  items: [
    {
      _id: historyId,
      subject: {
        model: '',
        name: 'Аксесуари нові',
        subjectId: '6048f900fc3c0b3b34fd4992'
      },
      valueBeforeChange: [{ value: 'Аксесуари' }],
      valueAfterChange: [{ value: 'Аксесуари нові' }],
      createdAt: '2021-04-09T19:15:43.674+00:00',
      action: 'EDIT_CATEGORY',
      userId: '60452208873045422c1dbef8'
    }
  ],
  count: 1
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

export const arrHistoryRecord = [historyRecord];
export const error = { message: 'HISTORY_ERROR', statusCode: 400 };
export const filter = {};

export const initialFilters = {
  action: [],
  role: [],
  dateFrom: '',
  dateTo: '',
  search: ''
};
export const mockInitialFilters = {
  search: ''
};

export const mockHistoryState = {
  filters: initialFilters,
  records: null,
  historyLoading: false,
  historyError: null,
  recordItem: null,
  recordItemLoading: false
};

export const mockHistoryRecordsLoadPayload = {
  limit: 10,
  skip: 0,
  filter: {}
};

const statuses = {
  SUCCESS_LOAD_STATUS: 'Успішно завантажено!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!'
};

export const mockError = {
  message: 'COMMENT_LOADING_ERROR'
};

export const mockSnackbarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

export const snackBarError = 'error';

module.exports = {
  historyId,
  historyRecord,
  arrHistoryRecord,
  error,
  filter,
  initialFilters,
  mockHistoryState,
  statuses,
  mockInitialFilters,
  mockHistoryRecordsLoadPayload,
  mockTableState,
  mockHistoryRecords
};
