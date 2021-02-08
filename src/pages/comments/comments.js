import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

import ReactHtmlParser from 'react-html-parser';
import { useCommonStyles } from '../common.styles';
import {
  getComments,
  deleteComment
} from '../../redux/comments/comments.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { commentSelectorWithPagination } from '../../redux/selectors/comments.selectors';
import getTime from '../../utils/getTime';

const tableTitles = config.tableHeadRowTitles.comments.commentPageTitles;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;

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
