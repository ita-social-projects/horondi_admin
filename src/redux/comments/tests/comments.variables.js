export const productId = '264677d549443a6816da3d09';
export const commentId = '564677d549443a6816da3d09';
export const userId = '964612d549443a6816da3d09';
export const commentsCurrentPage = 1;
export const commentsPerPage = 1;
export const commentsPagesCount = 1;

export const comment = {
  text: 'Test text',
  user: { email: 'TEST3123@gmail.com' },
  product: '264677d549443a6816da3d09',
  show: false
};

export const initialState = {
  list: [],
  comments: null,
  commentsLoading: false,
  commentsError: null,
  pagination: {
    currentPage: 0,
    commentsPerPage: 20,
    pagesCount: 1
  }
};

export const commentsType = 'FromUser';

export const commentsByUserMock = {
  data: {
    getAllCommentsByUser: {
      comment
    }
  }
};

export const commentsByProductMock = {
  data: {
    getAllCommentsByProduct: {
      comment
    }
  }
};

export const recentCommentsMock = {
  data: {
    getAllRecentComments: {
      comment
    }
  }
};

export const commentDeleteMock = {
  data: {
    deleteComment: {
      comment
    }
  }
};
