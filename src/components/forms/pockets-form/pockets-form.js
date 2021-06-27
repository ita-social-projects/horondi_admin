import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import usePocketsHandlers from '../../../utils/use-pockets-handlers';
import { useStyles } from './pockets-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { addPockets } from '../../../redux/pockets/pockets.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { pocketsTranslations } from '../../../translations/pockets.translations';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';
import {
  // getPocketsInitialValues,
  onSubmitPocketsHandler
} from '../../../utils/pockets-form';
import CheckboxOptions from '../../checkbox-options';

const labels = config.labels.pocketsPageLabel;

const {
  POCKETS_VALIDATION_ERROR,
  POCKETS_ERROR_MESSAGE,
  POCKETS_UA_NAME_MESSAGE,
  POCKETS_EN_NAME_MESSAGE
} = config.pocketsErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { POCKETS_ERROR } = pocketsTranslations;
// const { IMG_URL } = config;
const { enNameCreation, uaNameCreation, additionalPriceRegExp } =
  config.formRegExp;
const { materialUiConstants } = config;

const PocketsForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { createPockets, setUpload, upload, pocketsImage, setPocketsImage } =
    usePocketsHandlers();

  const { pathToPockets } = config.routes;

  const pocketsValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, POCKETS_VALIDATION_ERROR)
      .max(50, POCKETS_VALIDATION_ERROR)
      .required(POCKETS_ERROR_MESSAGE)
      .matches(uaNameCreation, POCKETS_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, POCKETS_VALIDATION_ERROR)
      .max(50, POCKETS_VALIDATION_ERROR)
      .required(POCKETS_ERROR_MESSAGE)
      .matches(enNameCreation, POCKETS_EN_NAME_MESSAGE),
    additionalPrice: Yup.string()
      .required(POCKETS_ERROR_MESSAGE)
      .matches(additionalPriceRegExp, POCKETS_VALIDATION_ERROR)
      .nullable()
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
    validationSchema: pocketsValidationSchema,
    onSubmit: (data) => {
      const newPocket = createPockets(data);
      const uploadCondition = upload instanceof File;
      onSubmitPocketsHandler(uploadCondition, dispatch, addPockets, {
        pocket: newPocket,
        upload
      });

      if (!uploadCondition) {
        dispatch(setSnackBarSeverity('error'));
        dispatch(setSnackBarMessage(POCKETS_ERROR));
        dispatch(setSnackBarStatus(true));
      }
    }
  });

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFieldValue('pocketImage', e.target.result);
        setPocketsImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  const checkboxes = [
    {
      id: 'restriction',
      dataCy: 'restriction',
      value: values.restriction,
      checked: values.restrictions,
      color: 'primary',
      label: labels.avaliable,
      handler: () => setFieldValue('restriction', !values.restriction)
    }
  ];

  const inputs = [{ label: labels.pocketsName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToPockets} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                className={styles.saveButton}
                data-cy='save'
                type='submit'
                title={SAVE_TITLE}
                values={values}
                errors={errors}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <CheckboxOptions options={checkboxes} />
        </div>
        <Grid item xs={12}>
          <Paper className={styles.categoryItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.avatarText}
            </span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer handler={handleImageLoad} />
            </div>
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <Paper className={styles.additionalPrice}>
          <Box>
            <Typography>{labels.enterPrice}</Typography>
          </Box>
          <TextField
            data-cy='additionalPrice'
            id='additionalPrice'
            className={styles.textField}
            variant={materialUiConstants.outlined}
            type={materialUiConstants.types.number}
            label={labels.additionalPrice}
            value={values.additionalPrice}
            inputProps={{ min: 0 }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.additionalPrice && !!errors.additionalPrice}
          />
          {touched.additionalPrice && errors.additionalPrice && (
            <div
              data-cy={materialUiConstants.codeError}
              className={styles.error}
            >
              {errors.additionalPrice}
            </div>
          )}
        </Paper>
      </form>
    </div>
  );
};

PocketsForm.propTypes = {
  values: PropTypes.shape({
    pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    restrictions: PropTypes.bool,
    typeOptions: PropTypes.string
  }),
  errors: PropTypes.shape({
    pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    restrictions: PropTypes.bool,
    typeOptions: PropTypes.string
  }),
  touched: PropTypes.shape({
    pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    restrictions: PropTypes.bool,
    typeOptions: PropTypes.string
  })
};

PocketsForm.defaultProps = {
  values: {},
  errors: {},
  touched: {}
};

export default PocketsForm;
