import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';

import usePositionHandlers from '../../../utils/use-position-handlers';
import { useStyles } from './position-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addPosition
  //   updatePosition
} from '../../../redux/position/position.actions';
// import ImageUploadContainer from '../../../containers/image-upload-container';
// import { pocketsTranslations } from '../../../translations/pockets.translations';
// import {
//   setSnackBarSeverity,
//   setSnackBarStatus,
//   setSnackBarMessage
// } from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';
import { getPositionInitialValues } from '../../../utils/position-form';
import CheckboxOptions from '../../checkbox-options';
// import { checkInitialValue } from '../../../utils/check-initial-values';

const labels = config.labels.positionPageLabel;

const {
  POSITION_MAX_LENGTH_MESSAGE,
  POSITION_MIN_LENGTH_MESSAGE,
  POSITION_ERROR_MESSAGE,
  POSITION_UA_NAME_MESSAGE,
  POSITION_EN_NAME_MESSAGE
} = config.positionErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
// const { POCKETS_ERROR } = pocketsTranslations;
// const { IMG_URL } = config;
const { enNameCreation, uaNameCreation } = config.formRegExp;
// const { materialUiConstants } = config;

const PositionForm = ({ position, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { createPosition } = usePositionHandlers();
  const { pathToPosition } = config.routes;

  const positionValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, POSITION_MIN_LENGTH_MESSAGE)
      .max(50, POSITION_MAX_LENGTH_MESSAGE)
      .required(POSITION_ERROR_MESSAGE)
      .matches(uaNameCreation, POSITION_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, POSITION_MIN_LENGTH_MESSAGE)
      .max(50, POSITION_MAX_LENGTH_MESSAGE)
      .required(POSITION_ERROR_MESSAGE)
      .matches(enNameCreation, POSITION_EN_NAME_MESSAGE)
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
    validationSchema: positionValidationSchema,
    initialValues: getPositionInitialValues(edit, position),
    onSubmit: (data) => {
      const newPosition = createPosition(data);

      
      //     const uploadCondition = upload instanceof File;

      // if (id) {
      //   dispatch(
      //     updatePosition({
      //       id,
      //       position: newPosition
      //     })
      //   );
      //   return;
      // }
      dispatch(addPosition({ position: newPosition }));

      //     if (!uploadCondition && !pocket.images.thumbnail) {
      //       dispatch(setSnackBarSeverity('error'));
      //       dispatch(setSnackBarMessage(POCKETS_ERROR));
      //       dispatch(setSnackBarStatus(true));
      //     }
    }
  });

  //   const handleImageLoad = (e) => {
  //     if (e.target.files && e.target.files[0]) {
  //       const reader = new FileReader();
  //       reader.onload = (data) => {
  //         setFieldValue('pocketImage', data.target.result);
  //         setPocketsImage(data.target.result);
  //       };
  //       reader.readAsDataURL(e.target.files[0]);
  //       setUpload(e.target.files[0]);
  //     }
  //   };

  const checkboxes = [
    {
      id: 'position',
      dataCy: 'position',
      value: values.avaliable,
      checked: values.avaliable,
      color: 'primary',
      label: labels.avaliable,
      handler: () => setFieldValue('avaliable', !values.avaliable)
    }
  ];

  const inputs = [{ label: labels.positionName, name: 'name' }];

  // console.log(values)

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  //   const valueEquality = checkInitialValue(
  //     getPocketsInitialValues(edit, IMG_URL, pocket),
  //     values
  //   );

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton
                className={styles.returnButton}
                //   initial={!valueEquality}
                pathBack={pathToPosition}
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
        <div>
          <CheckboxOptions options={checkboxes} />
        </div>
        {/* <Grid item xs={12}>
          <Paper>
            <span className={styles.imageUpload}>{labels.avatarText}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={edit ? values.pocketImage : pocketsImage}
              />
            </div>
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid> */}
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        {/* <Paper className={styles.additionalPrice}>
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
        </Paper> */}
      </form>
    </div>
  );
};

PositionForm.propTypes = {
  //   id: PropTypes.string,
  //   pocket: PropTypes.shape({
  //     images: PropTypes.shape({
  //       thumbnail: PropTypes.string
  //     })
  //   }),
  values: PropTypes.shape({
    // pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    avaliable: PropTypes.bool
    // optionType: PropTypes.string
  }),
  errors: PropTypes.shape({
    // pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    avaliable: PropTypes.bool
    // optionType: PropTypes.string
  }),
  touched: PropTypes.shape({
    // pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    avaliable: PropTypes.bool
    // optionType: PropTypes.string
  })
  //   edit: PropTypes.bool
};

PositionForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  position: {
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
    avaliable: false,
    optionType: null,
    additionalPrice: [
      { value: null, currency: '' },
      { value: null, currency: '' }
    ]
  },
  edit: false
};

export default PositionForm;
