import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { push } from 'connected-react-router';

import { useCommonStyles } from '../common.styles';
import { useStyles } from './comments.styles';
import {
  getComments,
  deleteComment,
  setCommentsCurrentPage
} from '../../redux/comments/comments.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { commentSelectorWithPagination } from '../../redux/selectors/comments.selectors';
import getTime from '../../utils/getTime';
import { handleComments } from '../../utils/handle-comments';
import materialUiConstants from '../../configs/material-ui-constants';
import { resetPagination } from '../../redux/table/table.actions';
import Filters from './filters/filters';

const tableTitles = config.tableHeadRowTitles.comments.commentPageTitles;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;
const {
  comment: { no, yes }
} = config.labels;
const { pathToCommentsEdit } = config.routes;

const map = require('lodash/map');

const Comments = () => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const dispatch = useDispatch();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { sort, filter, list, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(commentSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getComments({
        filter: {
          date: { dateFrom: filter.dateFrom, dateTo: filter.dateTo },
          show: filter.show,
          search: filter.search
        },
        pagination: {
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage
        },
        sort
      })
    );
  }, [dispatch, filter, rowsPerPage, currentPage, sort]);

  const commentDeleteHandler = (id) => {
    const removeComment = () => {
      dispatch(closeDialog());
      dispatch(deleteComment(id));
    };
    openSuccessSnackbar(removeComment, REMOVE_COMMENT_MESSAGE);
  };

  const commentItems = map(list, (comment) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      data={ReactHtmlParser(getTime(new Date(comment?.date), true))}
      userName={comment?.user?.email || 'Видалений користувач'}
      text={comment.text}
      show={comment?.show ? yes : no}
      id={comment?._id}
      count={comment?.replyCommentsCount}
      key={comment?._id}
      deleteHandler={() => {
        commentDeleteHandler(comment?._id);
      }}
      editHandler={() => {
        dispatch(setCommentsCurrentPage(currentPage));
        dispatch(resetPagination());
        dispatch(push(pathToCommentsEdit.replace(':id', comment?._id)));
      }}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={commonStyles.container}>
      <div className={`${commonStyles.adminHeader} ${styles.title}`}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={commonStyles.materialTitle}
          data-cy='comment-header'
        >
          {config.titles.commentTitles.mainPageTitle}
        </Typography>
      </div>
      <div>
        <Filters />
      </div>

      {commentItems?.length ? (
        <TableContainerGenerator
          pagination
          data-cy='commentTable'
          count={itemsCount}
          tableTitles={handleComments(
            commentItems,
            tableTitles,
            NO_COMMENTS_MESSAGE
          )}
          tableItems={commentItems}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_COMMENTS_MESSAGE}</p>
      )}
    </div>
  );
};

export default Comments;
