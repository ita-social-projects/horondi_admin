import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
// import { push } from 'connected-react-router';
// import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import ReactHtmlParser from 'react-html-parser';
import { useCommonStyles } from '../common.styles';
import {
  getComments,
  setCommentsCurrentPage,
  deleteComment
  // getCommentsByProduct
} from '../../redux/comments/comments.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { commentsTranslations } from '../../translations/comments.translations';
import { config } from '../../configs';
import { commentSelectorWithPagination } from '../../redux/selectors/comments.selectors';
import getTime from '../../utils/getTime';

const tableTitles = config.tableHeadRowTitles.comments.commentPageTitles;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;
// const { RECENT_COMMENTS } = commentsTranslations;

const map = require('lodash/map');

const Comments = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { list, loading, currentPage, rowsPerPage, itemsCount } = useSelector(
    commentSelectorWithPagination
  );
  useEffect(() => {
    dispatch(
      getComments({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const commentDeleteHandler = (id) => {
    const removeComment = () => {
      dispatch(closeDialog());
      dispatch(deleteComment(id));
    };
    openSuccessSnackbar(removeComment, REMOVE_COMMENT_MESSAGE);
  };

  const changePageHandler = (e, value) =>
    dispatch(setCommentsCurrentPage(value));

  if (loading) {
    return <LoadingBar />;
  }
  const commentItems = map(list, (comment) => (
    <TableContainerRow
      showAvatar={false}
      showEdit={false}
      userName={comment.user.email}
      data={ReactHtmlParser(getTime(comment.date, true))}
      text={comment.text}
      id={comment._id}
      key={comment._id}
      deleteHandler={() => {
        commentDeleteHandler(comment._id);
      }}
    />
  ));

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography
          variant='h1'
          className={commonStyles.materialTitle}
          data-cy='comment-header'
        >
          {config.titles.commentTitles.mainPageTitle}
        </Typography>
      </div>
      {!loading ? (
        <TableContainerGenerator
          pagination
          data-cy='commentTable'
          count={itemsCount}
          tableTitles={commentItems ? tableTitles : [NO_COMMENTS_MESSAGE]}
          tableItems={commentItems}
        />
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default Comments;

/*
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
  } = useSelector(selectCommentsListLoadingPages);

  useEffect(() => {
    dispatch(
      productId
        ? getCommentsByProduct({
          limit: commentsPerPage,
          skip: currentPage * commentsPerPage,
          commentsPerPage,
          id: productId
        })
        : getComments({
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
    openSuccessSnackbar(removeComment, REMOVE_COMMENT_MESSAGE);
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
  productId: PropTypes.string.isRequired
}; */
