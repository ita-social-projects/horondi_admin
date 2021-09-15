import React, { useEffect } from 'react';
import { TextField, Grid, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { BackButton, SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';
import ColorsBar from '../../colors-bar';
import useMaterialHandlers from '../../../utils/use-material-handlers';
import {
  getLabelValue,
  calculateAddittionalPriceValue
} from '../../../utils/additionalPrice-helper';
import getMaterialFormInitValues from '../../../utils/material-form';
import { useStyles } from './material-form.styles';
import {
  addMaterial,
  updateMaterial
} from '../../../redux/material/material.actions';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import { materialSelector } from '../../../redux/selectors/material.selectors';
import purposeEnum from '../../../configs/purpose-enum';
import LanguagePanel from '../language-panel';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import { getCurrencies } from '../../../redux/currencies/currencies.actions';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const { languages } = config;
const {
  VALIDATION_ERROR,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  PRICE_VALIDATION_ERROR
} = config.materialErrorMessages;

function MaterialForm({ material, id }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { pathToMaterials } = config.routes;

  const { loading } = useSelector(materialSelector);
  const exchangeRate = useSelector((state) => state.Currencies.exchangeRate);

  const { createMaterial } = useMaterialHandlers();

  const formSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    uaDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    enDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    purpose: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    additionalPriceType: Yup.string(),
    additionalPrice: Yup.string()
      .matches(config.formRegExp.onlyPositiveFloat, PRICE_VALIDATION_ERROR)
      .required(VALIDATION_ERROR),

    colors: Yup.array().of(Yup.string()).required(VALIDATION_ERROR)
  });

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      validationSchema: formSchema,
      validateOnBlur: true,
      initialValues: getMaterialFormInitValues(material, purposeEnum),
      onSubmit: (data) => {
        const newMaterial = createMaterial(data);
        if (id) {
          dispatch(
            updateMaterial({
              id,
              material: { ...newMaterial }
            })
          );
          return;
        }
        dispatch(
          addMaterial({
            material: { ...newMaterial }
          })
        );
      }
    });

  const changed = useChangedValuesChecker(values, errors);
  useUnsavedChangesHandler(values);
  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.material.available[0].value,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const inputs = [
    { label: config.labels.material.name, name: 'name' },
    { label: config.labels.material.description, name: 'description' }
  ];

  const { additionalPriceType } = config.labels.material;

  const { convertationTitle } = config.titles.materialTitles;
  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };

  const languageTabs = languages.map((lang) => (
    <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.materialForm}
        onSubmit={(e) => eventPreventHandler(e)}
      >
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToMaterials} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                data-cy='save'
                type='submit'
                onClickHandler={handleSubmit}
                title={config.buttonTitles.SAVE_MATERIAL}
                values={values}
                errors={errors}
                {...(id ? { disabled: !changed } : {})}
              />
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <CheckboxOptions options={checkboxes} />
          <ColorsBar
            onColorChange={(colors) => {
              setFieldValue(
                'colors',
                colors.map((color) => color._id)
              );
            }}
            colors={material.colors}
          />
          {errors.colors && (
            <div className={styles.inputError}>{errors.colors}</div>
          )}
          <Paper className={styles.materialItemAdd}>
            <FormControl
              variant='outlined'
              className={`${styles.formControl} 
              ${styles.purposeSelect}`}
            >
              <InputLabel htmlFor='outlined-age-native-simple'>
                Застосування
              </InputLabel>
              <Select
                data-cy='purpose'
                id='purpose'
                native
                value={values.purpose}
                onChange={(e) => setFieldValue('purpose', e.target.value)}
                label='Застосування'
              >
                {Object.values(purposeEnum).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
            {touched.purpose && errors.purpose && (
              <div className={styles.inputError}>{errors.purpose}</div>
            )}
            <br />
            <FormControl component='fieldset'>
              <RadioGroup
                className={styles.textField}
                name='additionalPriceType'
                value={values.additionalPriceType}
                onChange={handleChange}
              >
                <FormControlLabel
                  control={<Radio />}
                  value='ABSOLUTE_INDICATOR'
                  label={additionalPriceType.absolutePrice[0].value}
                  key={2}
                />
                <FormControlLabel
                  control={<Radio />}
                  value='RELATIVE_INDICATOR'
                  label={additionalPriceType.relativePrice[0].value}
                  key={1}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id='additionalPrice'
              data-cy='additionalPrice'
              className={styles.textField}
              variant='outlined'
              label={getLabelValue(values, additionalPriceType)}
              value={values.additionalPrice}
              onChange={handleChange}
              error={touched.additionalPrice && !!errors.additionalPrice}
            />
            {touched.additionalPrice && errors.additionalPrice && (
              <div className={styles.inputError}>{errors.additionalPrice}</div>
            )}
            <TextField
              label={convertationTitle}
              id='outlined-basic'
              variant='outlined'
              className={`
                  ${styles.textField} 
                  ${styles.currencyField}
                  `}
              value={calculateAddittionalPriceValue(values, exchangeRate)}
              disabled
            />
          </Paper>
        </Grid>
        {languages.length > 0 ? <div>{languageTabs}</div> : null}
      </form>
    </div>
  );
}

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

MaterialForm.propTypes = {
  id: PropTypes.string,
  material: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.arrayOf(valueShape),
    description: PropTypes.arrayOf(valueShape),
    simpleName: PropTypes.arrayOf(valueShape),
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    ),
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        colorHex: PropTypes.string,
        name: PropTypes.arrayOf(valueShape),
        simpleName: PropTypes.arrayOf(valueShape)
      })
    ),
    purpose: PropTypes.string,
    available: PropTypes.bool
  }),
  values: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string)
  }),
  errors: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    colors: PropTypes.string
  }),
  touched: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

MaterialForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  material: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    description: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    available: false,
    purpose: '',
    additionalPrice: 0,
    colors: []
  }
};

export default MaterialForm;
