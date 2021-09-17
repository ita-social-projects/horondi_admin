import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';

import { push } from 'connected-react-router';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import LoadingBar from '../loading-bar';
import { config } from '../../configs';
import {
  getCommentsByType,
  deleteComment
} from '../../redux/comments/comments.actions';
import { useStyles } from './comments-section.style';
import { commentSelectorWithPagination } from '../../redux/selectors/comments.selectors';
import FilterNavbar from '../filter-search-sort/filter-navbar';
import useCommentFilters from '../../hooks/filters/use-comment-filters';
import { handleComments } from '../../utils/handle-comments';
import getTime from '../../utils/getTime';

const { pathToCommentsEdit } = config.routes;
const {
  comment: { no, yes }
} = config.labels;
const tableTitles = config.tableHeadRowTitles.comments.commentPageTitles;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;

const CommentsSection = ({ id, commentsType }) => {
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const commentOptions = useCommentFilters();
  const { sort, filter, list, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(commentSelectorWithPagination);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCommentsByType({
        value: {
          filter: {
            filters: true,
            productId: id,
            date: { dateFrom: filter.dateFrom, dateTo: filter.dateTo },
            show: filter.show,
            search: filter.search
          },
          pagination: {
            limit: rowsPerPage,
            skip: currentPage * rowsPerPage
          },
          sort
        },
        commentsType
      })
    );
  }, [dispatch, id, commentsType, filter, rowsPerPage, currentPage, sort]);

  const commentDeleteHandler = (deleteId) => {
    const removeComment = () => {
      dispatch(closeDialog());
      dispatch(deleteComment(deleteId));
    };
    openSuccessSnackbar(removeComment, REMOVE_COMMENT_MESSAGE);
  };

  if (loading) {
    return <LoadingBar />;
  }

  const commentsItems =
    list && list.length >= 1
      ? list.map((commentItem) => (
          <TableContainerRow
            showAvatar={false}
            showEdit
            data={ReactHtmlParser(getTime(new Date(commentItem?.date), true))}
            userName={commentItem?.user?.email || 'Видалений користувач'}
            text={commentItem.text}
            show={commentItem?.show ? yes : no}
            id={commentItem?._id}
            count={commentItem?.replyCommentsCount}
            key={commentItem?._id}
            deleteHandler={() => {
              commentDeleteHandler(commentItem?._id);
            }}
            editHandler={() => {
              dispatch(
                push(pathToCommentsEdit.replace(':id', commentItem?._id))
              );
            }}
          />
        ))
      : null;

  return (
    <div className={styles.container}>
      <div>
        <FilterNavbar options={commentOptions || {}} />
      </div>
      <TableContainerGenerator
        pagination
        data-cy='commentTableInProduct'
        count={itemsCount}
        tableTitles={handleComments(
          commentsItems,
          tableTitles,
          NO_COMMENTS_MESSAGE
        )}
        tableItems={commentsItems}
      />
    </div>
  );
};

CommentsSection.propTypes = {
  id: PropTypes.string.isRequired,
  commentsType: PropTypes.string.isRequired
};

export default CommentsSection;
