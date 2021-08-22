import {
  SET_COMMENTS_LOADING,
  SET_COMMENTS,
  SET_COMMENTS_USER,
  SET_REPLIES_COMMENTS_USER,
  REMOVE_COMMENT_FROM_STORE,
  SET_COMMENTS_ERROR,
  SET_COMMENT,
  SET_FILTER,
  SET_FILTER_USER,
  SET_FILTER_REPLY_USER,
  CLEAR_FILTERS,
  CLEAR_FILTERS_USER,
  CLEAR_FILTERS_REPLY_USER,
  SET_RECENT_COMMENTS,
  SET_REPLY_COMMENTS,
  REMOVE_REPLY_COMMENT_FROM_STORE,
  CLEAR_COMMENT,
  SET_COMMENTS_CURRENT_PAGE,
  SET_COMMENT_SORT,
  SET_COMMENT_SORT_LABEL,
  SET_REPLY_FILTER,
  SET_REPLY_SORT,
  SET_REPLY_SORT_LABEL,
  CLEAR_REPLY_FILTERS,
  SET_REPLY,
  SET_REPLY_LOADING
} from './comments.types';

const initialFilters = {
  show: [],
  dateFrom: '',
  dateTo: '',
  search: ''
};

const defaultFiltersUser = { ...initialFilters, typeComment: 'COMMENT' };
const defaultFiltersReplyUser = { ...initialFilters };

export const initialState = {
  list: [],
  listUser: [],
  listRepliesUser: [],
  recentComments: [],
  filters: initialFilters,
  filtersUser: defaultFiltersUser,
  filtersReplyUser: defaultFiltersReplyUser,
  replyFilters: initialFilters,
  replySort: { date: 1 },
  replySortLabel: '',
  comments: null,
  commentsLoading: false,
  commentsError: null,
  replyComments: [],
  currentPageForComments: 0,
  sort: { date: -1 },
  sortLabel: '',
  replyLoading: false,
  reply: ''
};

export const selectComment = ({ Comments }) => ({
  list: Comments.list,
  listUser: Comments.listUser,
  listRepliesUser: Comments.listRepliesUser,
  recentComments: Comments.recentComments,
  filter: Comments.filters,
  filtersUser: Comments.filtersUser,
  filtersReplyUser: Comments.filtersReplyUser,
  loading: Comments.commentsLoading,
  comment: Comments.comment,
  replyComments: Comments.replyComments,
  currentPageForComments: Comments.currentPageForComments,
  sort: Comments.sort,
  sortLabel: Comments.sortLabel,
  replyFilters: Comments.replyFilters,
  replySort: Comments.replySort,
  replySortLabel: Comments.replySortLabel,
  replyLoading: Comments.replyLoading,
  reply: Comments.reply
});

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_REPLY:
      return {
        ...state,
        reply: action.payload
      };
    case SET_REPLY_LOADING:
      return {
        ...state,
        replyLoading: action.payload
      };
    case SET_COMMENTS_CURRENT_PAGE:
      return {
        ...state,
        currentPageForComments: action.payload
      };
    case SET_COMMENTS:
      return {
        ...state,
        list: action.payload
      };
    case SET_COMMENTS_USER:
      return {
        ...state,
        listUser: action.payload
      };
    case SET_REPLIES_COMMENTS_USER:
      return {
        ...state,
        listRepliesUser: action.payload
      };
    case SET_RECENT_COMMENTS:
      return {
        ...state,
        recentComments: action.payload
      };
    case SET_COMMENT_SORT:
      return {
        ...state,
        sort: {
          ...action.payload
        }
      };
    case SET_COMMENT_SORT_LABEL:
      return {
        ...state,
        sortLabel: action.payload
      };
    case SET_COMMENT:
      return {
        ...state,
        comment: action.payload
      };
    case SET_COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: action.payload
      };
    case REMOVE_COMMENT_FROM_STORE:
      const allLists = {
        list: state.list,
        listUser: state.listUser
      };

      const filteredLists = Object.keys(allLists).reduce(
        (acumulator, listKey) => {
          acumulator[listKey] = allLists[listKey].filter(
            (comment) => comment._id !== action.payload
          );
          return acumulator;
        },
        {}
      );

      return {
        ...state,
        list: [...filteredLists.list],
        listUser: [...filteredLists.listUser]
      };
    case SET_REPLY_COMMENTS:
      return {
        ...state,
        replyComments: action.payload
      };
    case REMOVE_REPLY_COMMENT_FROM_STORE:
      const allReplyLists = {
        list: state.replyComments,
        listUser: state.listRepliesUser
      };

      const filteredReplyLists = Object.keys(allReplyLists).reduce(
        (acumulator, listKey) => {
          acumulator[listKey] = allReplyLists[listKey].filter(
            (reply) => reply._id !== action.payload
          );
          return acumulator;
        },
        {}
      );

      return {
        ...state,
        replyComments: [...filteredReplyLists.list],
        listRepliesUser: [...filteredReplyLists.listUser]
      };
    case SET_COMMENTS_ERROR:
      return {
        ...state,
        commentsError: action.payload
      };
    case CLEAR_COMMENT:
      return {
        ...state,
        comment: null
      };

    case SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case SET_FILTER_USER:
      return {
        ...state,
        filtersUser: {
          ...state.filtersUser,
          ...action.payload
        }
      };
    case SET_FILTER_REPLY_USER:
      return {
        ...state,
        filtersReplyUser: {
          ...state.filtersReplyUser,
          ...action.payload
        }
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialFilters,
        sort: { date: -1 },
        sortLabel: ''
      };
    case CLEAR_FILTERS_USER:
      return {
        ...state,
        filtersUser: defaultFiltersUser,
        sort: { date: -1 },
        sortLabel: ''
      };
    case CLEAR_FILTERS_REPLY_USER:
      return {
        ...state,
        filtersReplyUser: defaultFiltersReplyUser,
        replySort: { date: -1 },
        replySortLabel: ''
      };
    case SET_REPLY_FILTER:
      return {
        ...state,
        replyFilters: {
          ...state.replyFilters,
          ...action.payload
        }
      };
    case SET_REPLY_SORT:
      return {
        ...state,
        replySort: {
          ...action.payload
        }
      };
    case SET_REPLY_SORT_LABEL:
      return {
        ...state,
        replySortLabel: action.payload
      };
    case CLEAR_REPLY_FILTERS:
      return {
        ...state,
        replyFilters: initialFilters,
        replySort: { date: 1 },
        replySortLabel: ''
      };
    default:
      return state;
  }
};

export default commentsReducer;
