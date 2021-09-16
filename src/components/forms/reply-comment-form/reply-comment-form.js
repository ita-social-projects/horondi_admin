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
import {
  addReplyComment,
  updateReply
} from '../../../redux/comments/comments.actions';
import { showErrorSnackbar } from '../../../redux/snackbar/snackbar.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const {
  REPLY_COMMENT_VALIDATION_ERROR,
  REPLY_COMMENT_ERROR_MESSAGE,
  MAX_LENGTH_MESSAGE
} = config.replyCommentErrorMessages;
const { SAVE_MESSAGE, SAVE_CHANGES } = config.messages;

const { SAVE_TITLE } = config.buttonTitles;
const { pathToCommentsEdit } = config.routes;

const ReplyCommentForm = ({
  reply,
  isEdit,
  commentId,
  adminId,
  adminReply
}) => {
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

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: replyCommentValidationSchema,
    initialValues: {
      replyText: reply.replyText || '',
      showReplyComment: adminReply ? true : reply.showReplyComment || false
    },
    onSubmit: (data) => {
      if (isEdit) {
        updateReplyCommentHandler(reply._id, data, reply.refToReplyComment);
      } else {
        addReplyCommentHandler(data);
      }
    }
  });

  useUnsavedChangesHandler(values);

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

  const updateReplyCommentHandler = (id, data, commentIdUpdate) => {
    const updateReplyForComment = () => {
      dispatch(closeDialog());
      dispatch(
        updateReply({
          replyCommentId: id,
          replyCommentData: {
            replyText: data.replyText,
            showReplyComment: data.showReplyComment
          },
          commentId: commentIdUpdate
        })
      );
    };
    openSuccessSnackbar(updateReplyForComment, SAVE_MESSAGE, SAVE_CHANGES);
  };

  const handleCommentClick = () => {
    if (reply?.refToReplyComment) {
      return history.push(
        pathToCommentsEdit.replace(':id', reply.refToReplyComment)
      );
    }
    dispatch(showErrorSnackbar("Comment doesn't exist"));
  };

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
              value={values.replyText}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.replyText && !!errors.replyText}
              multiline
            />
            {touched.replyText && errors.replyText && (
              <div data-cy='code-error' className={styles.error}>
                {errors.replyText}
              </div>
            )}
            {isEdit ? (
              <Button variant='contained' onClick={handleCommentClick}>
                {config.labels.replyComment.commentInfo}
              </Button>
            ) : null}
          </Paper>
          {isEdit ? (
            <BackButton
              pathBack={pathToCommentsEdit.replace(
                ':id',
                reply.refToReplyComment
              )}
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
  adminId: PropTypes.string,
  adminReply: PropTypes.bool
};
ReplyCommentForm.defaultProps = {
  reply: {},
  isEdit: false,
  commentId: '',
  adminId: '',
  adminReply: false
};

export default ReplyCommentForm;
