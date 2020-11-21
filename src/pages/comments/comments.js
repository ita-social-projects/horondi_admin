import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { useCommonStyles } from '../common.styles';
import {
  getRecentComments,
  setCommentsCurrentPage,
  deleteComment,
  getCommentsByProduct
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

const Comments = ({ productId }) => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(
      productId
        ? getCommentsByProduct({
          limit: commentsPerPage,
          skip: currentPage * commentsPerPage,
          commentsPerPage,
          id: productId
        })
        : getRecentComments({
          limit: commentsPerPage,
          skip: currentPage * commentsPerPage,
          commentsPerPage
        })
    );
  }, [dispatch, commentsPerPage, currentPage, productId]);

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
            userName={comment.user.name}
            text={comment.text}
            deleteHandler={() => commentDeleteHandler(comment._id)}
          />
        );
      })
      : null;

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {RECENT_COMMENTS}
        </Typography>
      </div>
      <TableContainerGenerator
        id='commentsTable'
        tableTitles={userComments ? tableHeaders : [NO_COMMENTS_MESSAGE]}
        tableItems={userComments}
      />
      <div className={commonStyles.pagination}>
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

Comments.propTypes = {
  productId: PropTypes.number.isRequired
};

export default Comments;
