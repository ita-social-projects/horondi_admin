import React from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { useStyles } from './reply-comment-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import CheckboxOptions from '../../checkbox-options';
import { config } from '../../../configs';
import { addReplyComment } from '../../../redux/comments/comments.actions';
import { showErrorSnackbar } from '../../../redux/snackbar/snackbar.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';

const {
  REPLY_COMMENT_VALIDATION_ERROR,
  REPLY_COMMENT_ERROR_MESSAGE,
  MAX_LENGTH_MESSAGE
} = config.replyCommentErrorMessages;
const { SAVE_MESSAGE, SAVE_CHANGES } = config.messages;

const { SAVE_TITLE } = config.buttonTitles;
const { pathToComments } = config.routes;

const ReplyCommentForm = ({ reply, isEdit, commentId, adminId }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const replyCommentValidationSchema = Yup.object().shape({
    replyText: Yup.string()
      .min(2, REPLY_COMMENT_VALIDATION_ERROR)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(REPLY_COMMENT_ERROR_MESSAGE),
    showReplyComment: Yup.bool()
  });

  const { values, handleSubmit, handleChange, touched, errors, setFieldValue } =
    useFormik({
      validationSchema: replyCommentValidationSchema,
      initialValues: {
        replyText: reply.replyText || '',
        showReplyComment: reply.showReplyComment || false
      },
      onSubmit: (data) => {
        if (isEdit) {
          return;
        }
        addReplyCommentHandler(data);
      }
    });

  const addReplyCommentHandler = (data) => {
    const addReplyForComment = () => {
      dispatch(closeDialog());
      dispatch(
        addReplyComment({
          id: adminId,
          commentId,
          replyCommentData: {
            replyText: data.replyText,
            showReplyComment: data.showReplyComment,
            refToReplyComment: commentId,
            answerer: adminId
          }
        })
      );
    };
    openSuccessSnackbar(addReplyForComment, SAVE_MESSAGE, SAVE_CHANGES);
  };

  function handleProductClick() {
    if (reply?.refToReplyComment) {
      return history.push(
        pathToComments.replace(':id', reply.refToReplyComment)
      );
    }
    dispatch(showErrorSnackbar('Comment not exist'));
  }

  const checkboxes = [
    {
      id: 'showReplyComment',
      dataCy: 'showReplyComment',
      value: values.showReplyComment,
      checked: values.showReplyComment,
      color: 'primary',
      label: config.labels.replyComment.show,
      handler: () => setFieldValue('showReplyComment', !values.showReplyComment)
    }
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <CheckboxOptions options={checkboxes} />
          <Paper className={styles.paper}>
            <TextField
              data-cy='replyText'
              name='replyText'
              className={styles.textField}
              variant='outlined'
              label={config.labels.replyComment.text}
              value={values.text}
              onChange={handleChange}
              error={touched.code && !!errors.code}
              multiline
            />
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
            {isEdit ? (
              <Button variant='contained' onClick={handleProductClick}>
                {config.labels.replyComment.commentInfo}
              </Button>
            ) : null}
          </Paper>
          {isEdit ? (
            <BackButton
              pathBack={pathToComments.replace(':id', reply.refToReplyComment)}
            />
          ) : null}
          <SaveButton
            className={styles.saveCommentButton}
            data-cy='save'
            type='submit'
            title={SAVE_TITLE}
            errors={errors}
            values={values}
          />
        </Grid>
      </form>
    </div>
  );
};

ReplyCommentForm.propTypes = {
  reply: PropTypes.shape({
    _id: PropTypes.string,
    replyText: PropTypes.string,
    createdAt: PropTypes.string,
    showReplyComment: PropTypes.bool,
    refToReplyComment: PropTypes.string,
    answerer: PropTypes.shape({
      email: PropTypes.string
    })
  }),
  isEdit: PropTypes.bool,
  commentId: PropTypes.string,
  adminId: PropTypes.string
};
ReplyCommentForm.defaultProps = {
  reply: {},
  isEdit: false,
  commentId: '',
  adminId: ''
};

export default ReplyCommentForm;
