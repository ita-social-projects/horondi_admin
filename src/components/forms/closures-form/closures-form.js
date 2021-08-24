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
// import { getClosuresInitialValues } from '../../../utils/closures-form';
import CheckboxOptions from '../../checkbox-options';
import { checkInitialValue } from '../../../utils/check-initial-values';
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
const { languages, IMG_URL, materialUiConstants } = config;

const { enNameCreation, uaNameCreation, additionalPriceRegExp } =
  config.formRegExp;

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
      debugger;
      const newClosure = createClosures(data);
      debugger;
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

  const getLabelValue = () => {
    switch (values.additionalPriceType) {
      case 'ABSOLUTE_INDICATOR':
        return additionalPriceType.absolutePrice[0].value;
      case 'RELATIVE_INDICATOR':
        return additionalPriceType.relativePrice[0].value;
      default:
        return '';
    }
  };

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
              <BackButton initial={!valueEquality} pathBack={pathToClosures} />
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
                name='additionalPriceType'
                className={styles.textField}
                value={values.additionalPriceType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='ABSOLUTE_INDICATOR'
                  control={<Radio />}
                  label={additionalPriceType.absolutePrice[0].value}
                  key={2}
                />
                <FormControlLabel
                  value='RELATIVE_INDICATOR'
                  control={<Radio />}
                  label={additionalPriceType.relativePrice[0].value}
                  key={1}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              data-cy='additionalPrice'
              id='additionalPrice'
              className={`
                  ${styles.textField} 
                  ${styles.materialSelect} 
                  `}
              variant='outlined'
              label={getLabelValue()}
              value={values.additionalPrice}
              onChange={handleChange}
              error={touched.additionalPrice && !!errors.additionalPrice}
            />
            {touched.additionalPrice && errors.additionalPrice && (
              <div className={styles.inputError}>{errors.additionalPrice}</div>
            )}
            <TextField
              id='outlined-basic'
              label={convertationTitle}
              variant='outlined'
              className={`
                  ${styles.textField} 
                  ${styles.currencyField}
                  `}
              value={
                values.additionalPriceType === 'ABSOLUTE_INDICATOR'
                  ? values.additionalPrice * Number(exchangeRate?.toFixed(2))
                  : '0'
              }
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
    // additionalPrice: [
    //   { value: null, currency: '' },
    //   { value: null, currency: '' }
    // ]
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
