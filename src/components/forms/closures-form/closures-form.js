import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import useClosuresHandlers from '../../../utils/use-closures-handlers';
import { useStyles } from './closures-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  closureDefaultProps,
  getClosuresInitialValues
} from '../../../utils/closures-form';
import {
  addClosures,
  updateClosure
} from '../../../redux/closures/closures.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import CheckboxOptions from '../../checkbox-options';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import {
  getLabelValue,
  calculateAddittionalPriceValue
} from '../../../utils/additionalPrice-helper';
import { getCurrencies } from '../../../redux/currencies/currencies.actions';

const labels = config.labels.closuresPageLabel;
const { additionalPriceType } = config.labels.closuresPageLabel;

const {
  CLOSURES_ERROR_MESSAGE,
  CLOSURES_UA_NAME_MESSAGE,
  CLOSURES_EN_NAME_MESSAGE,
  PHOTO_NOT_PROVIDED,
  CLOSURES_MAX_LENGTH_MESSAGE,
  CLOSURES_MIN_LENGTH_MESSAGE,
  CLOSURES_PRICE_ERROR
} = config.closuresErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { convertationTitle } = config.titles.closuresTitles;
const { languages, IMG_URL } = config;

const { enNameCreation, uaNameCreation } = config.formRegExp;

const ClosuresForm = ({ closure, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { createClosures, setUpload, upload, closuresImage, setClosuresImage } =
    useClosuresHandlers();
  const exchangeRate = useSelector((state) => state.Currencies.exchangeRate);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const { pathToClosures } = config.routes;

  const closuresValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, CLOSURES_MIN_LENGTH_MESSAGE)
      .max(50, CLOSURES_MAX_LENGTH_MESSAGE)
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(uaNameCreation, CLOSURES_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, CLOSURES_MIN_LENGTH_MESSAGE)
      .max(50, CLOSURES_MAX_LENGTH_MESSAGE)
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(enNameCreation, CLOSURES_EN_NAME_MESSAGE),
    additionalPriceType: Yup.string(),
    additionalPrice: Yup.string()
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(config.formRegExp.onlyPositiveFloat, CLOSURES_PRICE_ERROR)
      .nullable(),

    available: Yup.boolean(),
    closureImage: Yup.string().required(PHOTO_NOT_PROVIDED)
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
      const editAndUpload = edit && upload instanceof File;

      if (editAndUpload || edit) {
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
    }
  });

  useUnsavedChangesHandler(values);

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (data) => {
        setFieldValue('closureImage', data.target.result);
        setClosuresImage(data.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.closuresPageLabel.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const inputs = [{ label: labels.closuresName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const eventPreventDefaultHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={(e) => eventPreventDefaultHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToClosures} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                data-cy='save-btn'
                type='submit'
                title={SAVE_TITLE}
                values={values}
                errors={errors}
                onClickHandler={handleSubmit}
              />
            </Grid>
          </Grid>
        </div>
        <CheckboxOptions options={checkboxes} />
        <Grid item xs={12}>
          <Paper>
            <span className={styles.imageUpload}>{labels.avatarText}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={edit ? values.closureImage : closuresImage}
              />
            </div>
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid>
        <div>
          {languages.map((lang) => (
            <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
          ))}
        </div>
        <>
          <Paper className={styles.additionalPrice}>
            <Box>
              <Typography>{labels.enterPrice}</Typography>
            </Box>
            <FormControl component='fieldset'>
              <RadioGroup
                value={values.additionalPriceType}
                name='additionalPriceType'
                className={styles.textField}
                onChange={handleChange}
              >
                <FormControlLabel
                  control={<Radio />}
                  label={additionalPriceType.absolutePrice[0].value}
                  key={2}
                  value='ABSOLUTE_INDICATOR'
                />
                <FormControlLabel
                  control={<Radio />}
                  label={additionalPriceType.relativePrice[0].value}
                  key={1}
                  value='RELATIVE_INDICATOR'
                />
              </RadioGroup>
            </FormControl>
            <TextField
              data-cy='additionalPrice'
              className={`
                  ${styles.textField} 
                  ${styles.materialSelect} 
                  `}
              variant='outlined'
              label={getLabelValue(values, additionalPriceType)}
              value={values.additionalPrice}
              onChange={handleChange}
              id='additionalPrice'
              error={touched.additionalPrice && !!errors.additionalPrice}
            />
            {touched.additionalPrice && errors.additionalPrice && (
              <div className={styles.inputError}>{errors.additionalPrice}</div>
            )}
            <TextField
              id='outlined-basic'
              className={`
                  ${styles.textField} 
                  ${styles.currencyField}
                  `}
              label={convertationTitle}
              variant='outlined'
              value={calculateAddittionalPriceValue(values, exchangeRate)}
              disabled
            />
          </Paper>
        </>
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
    optionType: PropTypes.string,
    available: PropTypes.bool
  }),
  errors: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    available: PropTypes.bool
  }),
  touched: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    available: PropTypes.bool
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
    available: false,
    optionType: null,
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    )
  },
  edit: false
};

ClosuresForm.defaultProps = closureDefaultProps;

export default ClosuresForm;
