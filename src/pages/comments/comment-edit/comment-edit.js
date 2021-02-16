import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useStyles } from './comment-edit.styles';
import LoadingBar from '../../../components/loading-bar';
import CommentForm from '../../../components/forms/comment-form';
import { getComment } from '../../../redux/comments/comments.actions';
import { commentSelector } from '../../../redux/selectors/comments.selectors';

const CommentEdit = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const styles = useStyles();
  const { loading, comment } = useSelector(commentSelector);

  useEffect(() => {
    dispatch(getComment(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {comment !== null ? (
        <CommentForm id={id} comment={comment} isEdit />
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
