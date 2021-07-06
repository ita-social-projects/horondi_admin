import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { push } from 'connected-react-router';
import LoadingBar from '../../../../components/loading-bar';
import { commentSelector } from '../../../../redux/selectors/comments.selectors';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';
import { deleteReplyComment } from '../../../../redux/comments/comments.actions';
import { useStyles } from './reply-comments.style';
import { useCommonStyles } from '../../../common.styles';
import { config } from '../../../../configs';
import getTime from '../../../../utils/getTime';
import TableContainerRow from '../../../../containers/table-container-row';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import { handleComments } from '../../../../utils/handle-comments';
import materialUiConstants from '../../../../configs/material-ui-constants';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';

const {
  replyComment: { no, yes }
} = config.labels;
const tableTitles =
  config.tableHeadRowTitles.replyComments.replyCommentsPageTitles;
const { REMOVE_REPLY_COMMENT_MESSAGE, NO_REPLY_COMMENTS_MESSAGE } =
  config.messages;

const map = require('lodash/map');

const ReplyComments = ({ replyComments, itemsCount }) => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector(commentSelector);

  const { pathToReplyCommentsEdit } = config.routes;
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const replyCommentDeleteHandler = (id) => {
    const removeComment = () => {
      dispatch(closeDialog());
      dispatch(deleteReplyComment(id));
    };
    openSuccessSnackbar(removeComment, REMOVE_REPLY_COMMENT_MESSAGE);
  };

  const replyItems = map(replyComments, (reply) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      data={ReactHtmlParser(getTime(new Date(reply?.createdAt), true))}
      userName={reply?.answerer?.email}
      text={reply.replyText}
      show={reply?.showReplyComment ? yes : no}
      id={reply?._id}
      key={reply?._id}
      deleteHandler={() => {
        replyCommentDeleteHandler(reply?._id);
      }}
      editHandler={() => {
        dispatch(push(pathToReplyCommentsEdit.replace(':id', reply?._id)));
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
          {config.titles.replyCommentTitles.mainPageTitle}
        </Typography>
      </div>

      {replyItems?.length ? (
        <TableContainerGenerator
          pagination
          data-cy='commentTable'
          count={itemsCount}
          tableTitles={handleComments(
            replyItems,
            tableTitles,
            NO_REPLY_COMMENTS_MESSAGE
          )}
          tableItems={replyItems}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_REPLY_COMMENTS_MESSAGE}</p>
      )}
    </div>
  );
};
ReplyComments.propTypes = {
  itemsCount: PropTypes.number,
  replyComments: PropTypes.shape({
    _id: PropTypes.string,
    replyText: PropTypes.string,
    createdAt: PropTypes.string,
    showReplyComment: PropTypes.bool,
    answerer: PropTypes.shape({
      email: PropTypes.string
    })
  })
};

ReplyComments.defaultProps = {
  replyComments: [],
  itemsCount: 0
};

export default ReplyComments;
