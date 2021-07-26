import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';

import useClosuresHandlers from '../../../utils/use-closures-handlers';
import { useStyles } from './closures-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addClosures,
  updateClosure
} from '../../../redux/closures/closures.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { closuresTranslations } from '../../../translations/closures.translations';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';
import { getClosuresInitialValues } from '../../../utils/closures-form';
import CheckboxOptions from '../../checkbox-options';
import { checkInitialValue } from '../../../utils/check-initial-values';

const labels = config.labels.closuresPageLabel;

const {
  CLOSURES_VALIDATION_ERROR,
  CLOSURES_ERROR_MESSAGE,
  CLOSURES_UA_NAME_MESSAGE,
  CLOSURES_EN_NAME_MESSAGE
} = config.closuresErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { CLOSURES_ERROR } = closuresTranslations;
const { IMG_URL } = config;
const { enNameCreation, uaNameCreation, additionalPriceRegExp } =
  config.formRegExp;
const { materialUiConstants } = config;

const ClosuresForm = ({ closure, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {
    createClosures,
    setUpload,
    upload
    // closuresImage,
    // setClosuresImage
  } = useClosuresHandlers();

  const { pathToClosures } = config.routes;

  const closuresValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, CLOSURES_VALIDATION_ERROR)
      .max(50, CLOSURES_VALIDATION_ERROR)
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(uaNameCreation, CLOSURES_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, CLOSURES_VALIDATION_ERROR)
      .max(50, CLOSURES_VALIDATION_ERROR)
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(enNameCreation, CLOSURES_EN_NAME_MESSAGE),
    additionalPrice: Yup.string()
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(additionalPriceRegExp, CLOSURES_VALIDATION_ERROR)
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
    validationSchema: closuresValidationSchema,
    initialValues: getClosuresInitialValues(edit, IMG_URL, closure),
    onSubmit: (data) => {
      const newClosure = createClosures(data);
      const uploadCondition = upload instanceof File;

      if (id) {
        dispatch(
          updateClosure({
            id,
            closure: newClosure,
            upload
          })
        );
        return;
      }
      dispatch(addClosures({ closure: newClosure, upload }));

      if (!uploadCondition && !closure.images.thumbnail) {
        dispatch(setSnackBarSeverity('error'));
        dispatch(setSnackBarMessage(CLOSURES_ERROR));
        dispatch(setSnackBarStatus(true));
      }
    }
  });

  // const handleImageLoad = (files) => {
  //     if (files && files[0]) {
  //         const reader = new FileReader();
  //         reader.onload = (data) => {
  //             setFieldValue('closureImage', data.target.result);
  //             setClosuresImage(data.target.result);
  //         };
  //         reader.readAsDataURL(files[0]);
  //         setUpload(files[0]);
  //     }
  // };

  // const checkboxes = [
  //     {
  //         id: 'restriction',
  //         dataCy: 'restriction',
  //         value: values.restriction,
  //         checked: values.restriction,
  //         color: 'primary',
  //         label: labels.avaliable,
  //         handler: () => setFieldValue('restriction', !values.restriction)
  //     }
  // ];

  const inputs = [{ label: labels.closuresName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const valueEquality = checkInitialValue(
    getClosuresInitialValues(edit, IMG_URL, closure),
    values
  );

  const eventPreventDefaultHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={(e) => eventPreventDefaultHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton
                className={styles.returnButton}
                initial={!valueEquality}
                pathBack={pathToClosures}
              />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                className={styles.saveButton}
                data-cy='save'
                type='submit'
                title={SAVE_TITLE}
                values={values}
                errors={errors}
                onClickHandler={handleSubmit}
              />
            </Grid>
          </Grid>
        </div>
        <div>{/* <CheckboxOptions options={checkboxes} /> */}</div>
        <Grid item xs={12}>
          {/* <Paper> */}
          {/*    <span className={styles.imageUpload}>{labels.avatarText}</span> */}
          {/*    <div className={styles.imageUploadAvatar}> */}
          {/*        <ImageUploadContainer */}
          {/*            handler={handleImageLoad} */}
          {/*            src={edit ? values.closureImage : closuresImage} */}
          {/*        /> */}
          {/*    </div> */}
          {/*    {touched.code && errors.code && ( */}
          {/*        <div data-cy='code-error' className={styles.error}> */}
          {/*            {errors.code} */}
          {/*        </div> */}
          {/*    )} */}
          {/* </Paper> */}
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

ClosuresForm.propTypes = {
  id: PropTypes.string,
  closure: PropTypes.shape({
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }),
  values: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    // restrictions: PropTypes.bool,
    optionType: PropTypes.string
  }),
  errors: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    // restrictions: PropTypes.bool,
    optionType: PropTypes.string
  }),
  touched: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    // restrictions: PropTypes.bool,
    optionType: PropTypes.string
  }),
  edit: PropTypes.bool
};

ClosuresForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  closure: {
    _id: '',
    name: [
      {
        lang: '',
        value: ''
      },
      {
        lang: '',
        value: ''
      }
    ],
    images: {
      thumbnail: ''
    },
    // restrictions: false,
    optionType: null,
    additionalPrice: [
      { value: null, currency: '' },
      { value: null, currency: '' }
    ]
  },
  edit: false
};

export default ClosuresForm;
