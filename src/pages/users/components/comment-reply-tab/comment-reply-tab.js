import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import ReactHtmlParser from 'react-html-parser';

import getTime from '../../../../utils/getTime';
import {
  deleteReplyComment,
  setCommentsCurrentPage
} from '../../../../redux/comments/comments.actions';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import TableContainerRow from '../../../../containers/table-container-row';
import { config } from '../../../../configs';
import { useStyles } from './comment-reply-tab.styles';
import LoadingBar from '../../../../components/loading-bar';
import FilterNavbar from '../../../../components/filter-search-sort';
import useCommentReplyUserFilters from '../../../../hooks/filters/use-comment-reply-user-filters';
import { commentSelectorWithPagination } from '../../../../redux/selectors/comments.selectors';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import { resetPagination } from '../../../../redux/table/table.actions';

const tableTitles = config.tableHeadRowTitles.users.commentReplyTab;
const { REMOVE_REPLY_COMMENT_MESSAGE } = config.messages;
const {
  comment: { no, yes }
} = config.labels;
const { pathToCommentsEdit } = config.routes;

const CommentReplyTab = ({ list }) => {
  const tabStyles = useStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    loading: loadComment,
    itemsCount,
    currentPage
  } = useSelector(commentSelectorWithPagination);

  const commentReplyUserFilters = useCommentReplyUserFilters();

  const commentReplyDeleteHandler = (id) => {
    const removeReply = () => {
      dispatch(closeDialog());
      dispatch(deleteReplyComment(id));
    };
    openSuccessSnackbar(removeReply, REMOVE_REPLY_COMMENT_MESSAGE);
  };

  const commentReplyItems = list.map((reply) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      data={ReactHtmlParser(getTime(new Date(reply?.createdAt), true))}
      text={reply.replyText}
      show={reply?.showReplyComment ? yes : no}
      id={reply?._id}
      verifiedPurchase={reply?.verifiedPurchase ? yes : no}
      key={reply?._id}
      deleteHandler={() => {
        commentReplyDeleteHandler(reply?._id);
      }}
      editHandler={() => {
        dispatch(setCommentsCurrentPage(currentPage));
        dispatch(resetPagination());
        dispatch(
          push(pathToCommentsEdit.replace(':id', reply?.refToReplyComment))
        );
      }}
    />
  ));

  if (loadComment) {
    return <LoadingBar />;
  }

  return (
    <>
      <div className={tabStyles.filters}>
        <FilterNavbar options={commentReplyUserFilters || {}} />
      </div>
      <div>
        <TableContainerGenerator
          pagination
          count={itemsCount}
          id='usersTable'
          tableTitles={tableTitles}
          tableItems={commentReplyItems}
        />
      </div>
    </>
  );
};

CommentReplyTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentReplyTab;
