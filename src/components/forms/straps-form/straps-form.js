import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from './straps-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { addStraps, updateStrap } from '../../../redux/straps/straps.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import { getStrapsInitialValues } from '../../../utils/straps-form';
import CheckboxOptions from '../../checkbox-options';
import { getColors } from '../../../redux/color/color.actions';
import useStrapsHandlers from '../../../utils/use-straps-handlers';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import AdditionalPriceContainer from '../../../containers/additional-price-container';

const { STRAPS_COLOR_ERROR_MESSAGE } = config.strapsErrorMessages;
const {
  PRICE_ERROR,
  ERROR_MESSAGE,
  UA_NAME_MESSAGE,
  EN_NAME_MESSAGE,
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE
} = config.commonErrorMessages;
const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { IMG_URL } = config;
const { enNameCreation, uaNameCreation, additionalPriceRegExp } =
  config.formRegExp;
const { materialUiConstants } = config;
const { pathToStraps } = config.routes;
const { convertationTitle } = config.titles.strapsTitles;
const labels = { ...config.labels.strapsPageLabel, convertationTitle };

const StrapsForm = ({ strap, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { createStraps, setUpload, upload, strapImage, setStrapImage } =
    useStrapsHandlers();

  useEffect(() => {
    dispatch(
      getColors({
        pagination: {
          skip: null,
          limit: null
        }
      })
    );
  }, [dispatch]);

  const { colorsList } = useSelector(({ Color }) => ({
    colorsList: Color.list
  }));

  const strapsValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(uaNameCreation, UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(enNameCreation, EN_NAME_MESSAGE),
    additionalPrice: Yup.string()
      .required(ERROR_MESSAGE)
      .matches(additionalPriceRegExp, PRICE_ERROR)
      .nullable(),
    additionalPriceType: Yup.string(),
    available: Yup.boolean(),
    strapImage: Yup.string(),
    color: Yup.string().required(STRAPS_COLOR_ERROR_MESSAGE)
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
    validationSchema: strapsValidationSchema,
    initialValues: getStrapsInitialValues(IMG_URL, strap),
    onSubmit: (data) => {
      if (edit && strap.image) data.image = strap.image;

      const newStrap = createStraps(data);

      if (edit) {
        dispatch(
          updateStrap({
            id,
            strap: newStrap,
            image: upload
          })
        );
        return;
      }

      dispatch(addStraps({ strap: newStrap, image: upload }));
    }
  });

  const unblock = useUnsavedChangesHandler(values);

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (data) => {
        setFieldValue('strapImage', data.target.result);
        setStrapImage(data.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const checkboxes = (checkBoxName, label) => [
    {
      id: `${checkBoxName}`,
      dataCy: `${checkBoxName}`,
      value: values[`${checkBoxName}`],
      checked: values[`${checkBoxName}`],
      color: materialUiConstants.primary,
      label,
      handler: () =>
        setFieldValue(`${checkBoxName}`, !values[`${checkBoxName}`])
    }
  ];

  const inputs = [{ label: labels.strapsName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

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
                pathBack={pathToStraps}
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
                unblockFunction={unblock}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <CheckboxOptions
            options={checkboxes('available', labels.available)}
          />
        </div>
        <Grid item xs={12}>
          <Paper>
            <span className={styles.imageUpload}>{labels.avatarText}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={edit ? values.strapImage : strapImage}
              />
            </div>
          </Paper>
        </Grid>
        <Paper className={styles.colorPaper}>
          <Box>
            <Typography>{labels.chooseColor.title}</Typography>
          </Box>
          <FormControl
            variant='outlined'
            className={`${styles.formControl} ${styles.colorSelect}`}
          >
            <InputLabel variant='outlined'>
              {labels.chooseColor.inputTitle}
            </InputLabel>
            <Select
              label={labels.chooseColor.inputTitle}
              data-cy='color'
              name='color'
              error={touched.color && !!errors.color}
              value={values.color || []}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {colorsList.map(({ _id, name }) => (
                <MenuItem key={_id} value={_id}>
                  {name[0].value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {touched.color && errors.color && (
            <div data-cy='color-error' className={styles.error}>
              {errors.color}
            </div>
          )}
        </Paper>
        <AdditionalPriceContainer
          values={values}
          labels={labels}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <Paper className={styles.inputPanel}>
          {languages.map((lang) => (
            <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
          ))}
        </Paper>
      </form>
    </div>
  );
};

StrapsForm.propTypes = {
  id: PropTypes.string,
  strap: PropTypes.shape({
    image: PropTypes.string,
    optionType: PropTypes.string,
    names: PropTypes.shape([]),
    features: PropTypes.shape({
      color: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
      })
    }),
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    ),
    available: PropTypes.bool
  }),
  values: PropTypes.shape({
    strapImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    color: PropTypes.string,
    additionalPrice: PropTypes.number,
    available: PropTypes.bool
  }),
  errors: PropTypes.shape({
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    color: PropTypes.string,
    additionalPrice: PropTypes.number,
    available: PropTypes.bool
  }),
  touched: PropTypes.shape({
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    color: PropTypes.string,
    additionalPrice: PropTypes.number,
    available: PropTypes.bool
  }),
  edit: PropTypes.bool
};

StrapsForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  strap: {
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
    image: '',
    optionType: '',
    additionalPrice: [{ value: null }, { value: null }],
    features: {
      color: { _id: '', name: '' }
    },
    available: false
  },
  edit: false
};

export default StrapsForm;
