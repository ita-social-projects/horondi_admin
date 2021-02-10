import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { useStyles } from './comment-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { updateComment } from '../../../redux/comments/comments.actions';
import { commentSelector } from '../../../redux/selectors/comments.selectors';

const {
  COMMENT_VALIDATION_ERROR,
  COMMENT_ERROR_MESSAGE,
  MAX_LENGTH_MESSAGE
} = config.commentErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const CommentForm = ({ comment, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const commentValidationSchema = Yup.object().shape({
    text: Yup.string()
      .min(2, COMMENT_VALIDATION_ERROR)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(COMMENT_ERROR_MESSAGE)
  });

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    validationSchema: commentValidationSchema,
    initialValues: {
      text: comment.text || '',
      show: comment.show || false
    },
    onSubmit: (data) => {
      if (isEdit) {
        dispatch(
          updateComment({
            id,
            comment: {
              text: data.text,
              show: data.show,
              user: comment.user._id,
              product: comment.product._id
            }
          })
        );
      }
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Paper>
            <TextField
              data-cy='text'
              name='text'
              className={styles.textField}
              variant='outlined'
              label={config.labels.comment.text}
              value={values.text}
              onChange={handleChange}
              error={touched.code && !!errors.code}
            />
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
          <BackButton />
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

CommentForm.propTypes = {
  id: PropTypes.string,
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
  }),
  isEdit: PropTypes.bool,
  values: PropTypes.shape({
    text: PropTypes.string,
    show: PropTypes.bool
  }),
  errors: PropTypes.shape({
    text: PropTypes.string,
    show: PropTypes.bool
  }),
  touched: PropTypes.shape({
    text: PropTypes.string,
    show: PropTypes.bool
  })
};
CommentForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  comment: {
    _id: '',
    text: '',
    show: false
  },
  isEdit: false
};

export default CommentForm;
