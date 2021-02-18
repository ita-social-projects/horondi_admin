import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { push } from 'connected-react-router';

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
import FilterNavbar from '../../components/filter-search-sort/filter-navbar';
import useCommentFilters from '../../hooks/filters/use-comment-filters';

const tableTitles = config.tableHeadRowTitles.comments.commentPageTitles;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;

const { pathToCommentsEdit } = config.routes;

const map = require('lodash/map');

const Comments = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const commentOptions = useCommentFilters();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    filter,
    list,
    loading,
    currentPage,
    rowsPerPage,
    itemsCount
  } = useSelector(commentSelectorWithPagination);
  useEffect(() => {
    dispatch(
      getComments({
        filter,
        pagination: {
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage
        }
      })
    );
  }, [dispatch, filter, rowsPerPage, currentPage]);

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
      showEdit
      userName={comment.user.email}
      data={ReactHtmlParser(getTime(comment.date, true))}
      text={comment.text}
      id={comment._id}
      key={comment._id}
      deleteHandler={() => {
        commentDeleteHandler(comment._id);
      }}
      editHandler={() => {
        dispatch(push(pathToCommentsEdit.replace(':id', comment._id)));
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
      <div>
        <FilterNavbar options={commentOptions || {}} />
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
