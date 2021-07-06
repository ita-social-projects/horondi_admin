import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStyles } from './comment-edit.styles';
import LoadingBar from '../../../components/loading-bar';
import CommentForm from '../../../components/forms/comment-form';
import {
  getComment,
  getReplyComments,
  clearComment
} from '../../../redux/comments/comments.actions';
import {
  commentSelector,
  commentSelectorWithPagination
} from '../../../redux/selectors/comments.selectors';
import ReplyComments from './replyComments';
import ReplyCommentForm from '../../../components/forms/reply-comment-form/reply-comment-form';

const CommentEdit = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const styles = useStyles();
  const { loading, comment } = useSelector(commentSelector);

  const { currentPage, rowsPerPage, replyComments } = useSelector(
    commentSelectorWithPagination
  );
  const { adminId } = useSelector(({ Auth }) => ({ adminId: Auth.adminId }));

  useEffect(
    () => () => {
      dispatch(clearComment());
    },
    []
  );
  useEffect(() => {
    dispatch(getComment(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      getReplyComments({
        filter: {
          filters: true,
          commentId: id
        },
        pagination: {
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage
        }
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {comment !== null ? (
        <>
          <CommentForm id={id} comment={comment} isEdit />
          <ReplyCommentForm commentId={comment?._id} adminId={adminId} />
          <ReplyComments
            replyComments={replyComments}
            itemsCount={comment?.replyCommentsCount}
          />
        </>
      ) : null}
    </div>
  );
};

CommentEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  comment: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    show: PropTypes.bool,
    user: PropTypes.shape({
      _id: PropTypes.string
    }),
    product: PropTypes.shape({
      _id: PropTypes.string
    })
  })
};

CommentEdit.defaultProps = {
  comment: {}
};
export default CommentEdit;
