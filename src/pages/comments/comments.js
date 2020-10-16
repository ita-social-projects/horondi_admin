import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Typography } from '@material-ui/core/';
import { Pagination } from '@material-ui/lab';

import { useStyles } from './comments.style';

import {
  getRecentComments,
  setCommentsCurrentPage,
  deleteComment
} from '../../redux/comments/comments.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { commentsTranslations } from '../../translations/comments.translations';
import { config } from '../../configs';

const tableHeaders = config.tableHeadRowTitles.comments;
const { REMOVE_COMMENT_TITLE } = config.buttonTitles;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;
const { RECENT_COMMENTS } = commentsTranslations;

const CommentsPage = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    loading,
    list,
    pagesCount,
    currentPage,
    commentsPerPage
  } = useSelector(({ Comments }) => ({
    list: Comments.list,
    loading: Comments.commentsLoading,
    pagesCount: Comments.pagination.pagesCount,
    currentPage: Comments.pagination.currentPage,
    commentsPerPage: Comments.pagination.commentsPerPage
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getRecentComments({
        limit: commentsPerPage,
        skip: currentPage * commentsPerPage,
        commentsPerPage
      })
    );
  }, [dispatch, commentsPerPage, currentPage]);

  const commentDeleteHandler = (id) => {
    const removeComment = () => {
      dispatch(closeDialog());
      dispatch(deleteComment(id));
    };
    openSuccessSnackbar(
      removeComment,
      REMOVE_COMMENT_TITLE,
      REMOVE_COMMENT_MESSAGE,
      REMOVE_COMMENT_TITLE
    );
  };

  const changePageHandler = (e, value) =>
    dispatch(setCommentsCurrentPage(value));

  if (loading) {
    return <LoadingBar />;
  }

  const userComments =
    list && list.length >= 1
      ? list.map((comment) => {
        const createdAt = new Date(
          parseInt(comment.date, 10)
        ).toLocaleString();

        return (
          <TableContainerRow
            key={comment._id}
            id={comment._id}
            showEdit={false}
            showAvatar={false}
            date={createdAt}
            text={comment.text}
            deleteHandler={() => commentDeleteHandler(comment._id)}
          />
        );
      })
      : null;

  return (
    <div className={classes.content}>
      <div className={classes.tableNavigation}>
        <Typography variant='h1' className={classes.usersTitle}>
          {RECENT_COMMENTS}
        </Typography>
      </div>
      <div className={classes.tableContainer}>
        <TableContainerGenerator
          id='commentsTable'
          tableTitles={userComments ? tableHeaders : [NO_COMMENTS_MESSAGE]}
          tableItems={userComments}
        />
      </div>
      <div className={classes.pagination}>
        <Pagination
          count={pagesCount}
          variant='outlined'
          shape='rounded'
          page={currentPage + 1}
          onChange={changePageHandler}
        />
      </div>
    </div>
  );
};

export default CommentsPage;
