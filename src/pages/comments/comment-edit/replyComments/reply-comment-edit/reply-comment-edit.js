import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStyles } from './reply-comment-edit.styles';
import ReplyCommentForm from '../../../../../components/forms/reply-comment-form';
import { getReply } from '../../../../../redux/comments/comments.actions';
import LoadingBar from '../../../../../components/loading-bar';
import { commentSelector } from '../../../../../redux/selectors/comments.selectors';

const ReplyCommentEdit = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { adminId } = useSelector(({ Auth }) => ({ adminId: Auth.adminId }));
  const styles = useStyles();
  const { loading, replyLoading, reply } = useSelector(commentSelector);

  // const { reply } = useSelector(({ Comments }) => ({
  //   reply: Comments.replyComments.filter((item) => item._id === id)
  // }));

  useEffect(() => {
    dispatch(getReply({ id }));
  }, [dispatch, id]);

  if (loading || replyLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {reply ? (
        <ReplyCommentForm
          reply={reply}
          commentId={reply?.refToReplyComment}
          adminId={adminId}
          isEdit
        />
      ) : null}
    </div>
  );
};

ReplyCommentEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

ReplyCommentEdit.defaultProps = {};
export default ReplyCommentEdit;
