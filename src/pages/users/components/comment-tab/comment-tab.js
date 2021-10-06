import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import ReactHtmlParser from 'react-html-parser';

import getTime from '../../../../utils/getTime';
import {
  deleteComment,
  setCommentsCurrentPage
} from '../../../../redux/comments/comments.actions';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import TableContainerRow from '../../../../containers/table-container-row';
import { config } from '../../../../configs';
import { useStyles } from './comment-tab.styles';
import LoadingBar from '../../../../components/loading-bar';
import { commentSelectorWithPagination } from '../../../../redux/selectors/comments.selectors';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import { resetPagination } from '../../../../redux/table/table.actions';
import { useCommonStyles } from '../../../common.styles';
import Filters from './filters/filters';

const tableTitles = config.tableHeadRowTitles.users.commentTab;
const { REMOVE_COMMENT_MESSAGE, NO_COMMENTS_MESSAGE } = config.messages;
const {
  comment: { no, yes }
} = config.labels;
const { pathToCommentsEdit } = config.routes;

const CommentTab = ({ list }) => {
  const commonStyles = useCommonStyles();
  const tabStyles = useStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    loading: loadComment,
    itemsCount,
    currentPage
  } = useSelector(commentSelectorWithPagination);

  const commentDeleteHandler = (id) => {
    const removeComment = () => {
      dispatch(closeDialog());
      dispatch(deleteComment(id));
    };
    openSuccessSnackbar(removeComment, REMOVE_COMMENT_MESSAGE);
  };

  const commentItems = list.map((comment) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      data={ReactHtmlParser(getTime(new Date(comment?.date), true))}
      text={comment.text}
      show={comment?.show ? yes : no}
      id={comment?._id}
      count={comment?.replyCommentsCount}
      key={comment?._id}
      product={comment?.product?.name[0]?.value}
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

  if (loadComment) {
    return <LoadingBar />;
  }

  return (
    <>
      <div className={tabStyles.filters}>
        <Filters />
      </div>
      <div>
        {commentItems?.length ? (
          <TableContainerGenerator
            pagination
            count={itemsCount}
            id='usersTable'
            tableTitles={tableTitles}
            tableItems={commentItems}
          />
        ) : (
          <p className={commonStyles.noRecords}>{NO_COMMENTS_MESSAGE}</p>
        )}
      </div>
    </>
  );
};

CommentTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentTab;
