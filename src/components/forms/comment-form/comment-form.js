import React from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { useStyles } from './comment-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import CheckboxOptions from '../../checkbox-options';
import { config } from '../../../configs';
import { updateComment } from '../../../redux/comments/comments.actions';
import { showErrorSnackbar } from '../../../redux/snackbar/snackbar.actions';

import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const { COMMENT_VALIDATION_ERROR, COMMENT_ERROR_MESSAGE, MAX_LENGTH_MESSAGE } =
  config.commentErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const { pathToEditProduct } = config.routes;
const { pathToComments } = config.routes;

const CommentForm = ({ comment, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const commentValidationSchema = Yup.object().shape({
    text: Yup.string()
      .min(2, COMMENT_VALIDATION_ERROR)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(COMMENT_ERROR_MESSAGE),
    show: Yup.bool()
  });

  const { values, handleSubmit, handleChange, touched, errors, setFieldValue } =
    useFormik({
      validationSchema: commentValidationSchema,
      initialValues: {
        text: comment.text,
        show: comment.show
      },
      onSubmit: (data) => {
        if (isEdit) {
          commentUpdateHandler(data);
        }
      }
    });

  const checkboxes = [
    {
      id: 'show',
      dataCy: 'show',
      value: values.show,
      checked: values.show,
      color: 'primary',
      label: config.labels.comment.show,
      handler: () => setFieldValue('show', !values.show)
    }
  ];

  const changed = useChangedValuesChecker(values, errors);
  const unblock = useUnsavedChangesHandler(values);

  const commentUpdateHandler = (data) => {
    dispatch(
      updateComment({
        id,
        comment: {
          text: data.text,
          show: data.show
        }
      })
    );
  };

  function handleProductClick() {
    if (comment.product?._id) {
      return history.push(
        pathToEditProduct.replace(':id', comment.product._id)
      );
    }
    dispatch(showErrorSnackbar("Product doesn't exist"));
  }

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToComments} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                onClickHandler={handleSubmit}
                unblockFunction={unblock}
                data-cy='save'
                type='submit'
                title={SAVE_TITLE}
                errors={errors}
                values={values}
                {...(id ? { disabled: !changed } : {})}
              />
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <CheckboxOptions options={checkboxes} />
          <Paper className={styles.paper}>
            <TextField
              data-cy='text'
              name='text'
              className={styles.textField}
              variant='outlined'
              label={config.labels.comment.text}
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
            <Button variant='contained' onClick={handleProductClick}>
              {config.labels.comment.productInfo}
            </Button>
          </Paper>
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
