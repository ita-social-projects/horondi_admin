export const mockInitialFilters = {
  _id: [],
  search: ''
};

export const filter = {
  search: 'плюси'
};

export const currentPage = 1;
export const rowsPerPage = 10;
export const rowsPerPageOptions = [10, 20, 30];
export const commentsLoadingStatus = true;
export const commentsErrorExample = 'COMMENT_LOADING_ERROR';
export const commentId = '92cb31bf8e5ea5af3914g342';
export const productId = '601826s62b8fd28f3bc509e7';
export const userId = '601d7907des7e48816a42a63';
export const switchId = 'ed17f080d44d7r88740a4ad1';
export const mockError = {
  message: 'COMMENT_LOADING_ERROR'
};
export const effectPutType = 'PUT';
export const effectCallType = 'CALL';
export const snackBarError = 'error';

export const mockSnackbarState = {
  snackBarStatus: false,
  snackBarSeverity: '',
  snackBarMessage: ''
};

export const pagination = {
  skip: currentPage * rowsPerPage,
  limit: 10
};

export const commentsList = [];
export const comments = {
  list: [
    {
      _id: '601824cf6ec0f77526a74e38',
      text:
        'Плюси: вигляд, якість пошивки, зручні кишеньки; Мінуси: поки немає',
      date: '1612195023937',
      user: {
        _id: '5fb3ab4bef7b4b0024ddf53c',
        firstName: 'Iryna',
        email: 'i.bzdyr@outlook.com'
      },
      product: {
        _id: '601013b62b3fd28f3bc509e7'
      },
      show: true
    },
    {
      _id: '601839e0e1cbb681a77265ac',
      text:
        'Відтінок матеріалу на реальному виробі трохи відрізняється від фото',
      date: '1612200416386',
      user: {
        _id: '5faced40a3e018192ca5cd8e',
        firstName: 'Petro',
        email: 'qwerdsd223@gmail.com'
      },
      product: {
        _id: '601013b62b3fd28f3bc509e7'
      },
      show: true
    }
  ]
};

export const singleComment = {
  _id: '601839e0e1cbb681a77265ac',
  text: 'Відтінок матеріалу на реальному виробі трохи відрізняється від фото',
  date: '1612200416386',
  user: {
    _id: '5faced40a3e018192ca5cd8e',
    firstName: 'Petro',
    email: 'qwerdsd223@gmail.com'
  },
  product: {
    _id: '601013b62b3fd28f3bc509e7'
  },
  show: true
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

export const commentsInitialState = {
  list: [],
  filters: mockInitialFilters,
  comments: null,
  commentsLoading: false,
  commentsError: null
};

export const commentRes = {
  items: comments.list,
  count: 1
};
