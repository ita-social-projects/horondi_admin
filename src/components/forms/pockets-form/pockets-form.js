import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';

import usePocketsHandlers from '../../../utils/use-pockets-handlers';
import { useStyles } from './pockets-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addPockets,
  updatePocket
} from '../../../redux/pockets/pockets.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { showErrorSnackbar } from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';
import { getPocketsInitialValues } from '../../../utils/pockets-form';
import CheckboxOptions from '../../checkbox-options';
import { getAllPositions } from '../../../redux/position/position.actions';
import { handleCircularProgress } from '../../../utils/handle-orders-page';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import AdditionalPriceContainer from '../../../containers/additional-price-container';

const { convertationTitle } = config.titles.closuresTitles;

const labels = { ...config.labels.pocketsPageLabel, convertationTitle };

const {
  POCKETS_POSITION_ERROR_MESSAGE,
  POCKETS_ERROR,
  POCKETS_UA_NAME_MESSAGE,
  POCKETS_EN_NAME_MESSAGE
} = config.pocketsErrorMessages;

const { ERROR_MESSAGE, PRICE_ERROR, MAX_LENGTH_MESSAGE, MIN_LENGTH_MESSAGE } =
  config.commonErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { IMG_URL } = config;
const { enNameCreation, uaNameCreation } = config.formRegExp;
const { materialUiConstants } = config;
const { pathToPockets } = config.routes;

const PocketsForm = ({ pocket, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const checkIsEdit = (checkCondition) => {
    if (checkCondition) {
      return pocket.positions.map((item) => item._id);
    }
  };

  const { createPockets, setUpload, upload, pocketsImage, setPocketsImage } =
    usePocketsHandlers();

  useEffect(() => {
    dispatch(
      getAllPositions({
        pagination: {
          skip: null,
          limit: null
        }
      })
    );
  }, [dispatch]);

  const { positionsList, loadingPositions } = useSelector(({ Positions }) => ({
    positionsList: Positions.list.items,
    loadingPositions: Positions.positionsLoading
  }));

  const [positions, setPositions] = useState(pocket.positions || []);

  const availablePositions =
    positionsList && positionsList.length
      ? positionsList.filter((el) => el.available)
      : null;

  const pocketsValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(uaNameCreation, POCKETS_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(enNameCreation, POCKETS_EN_NAME_MESSAGE),
    additionalPriceType: Yup.string(),
    additionalPrice: Yup.string()
      .required(ERROR_MESSAGE)
      .matches(config.formRegExp.onlyPositiveFloat, PRICE_ERROR)
      .nullable(),
    positions: Yup.string().required(POCKETS_POSITION_ERROR_MESSAGE)
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
    initialValues: getPocketsInitialValues(edit, IMG_URL, pocket, checkIsEdit),
    onSubmit: (data) => {
      const newPocket = createPockets(data);
      const uploadCondition = upload instanceof File;

      if (id) {
        dispatch(
          updatePocket({
            id,
            pocket: newPocket,
            upload
          })
        );
        return;
      }
      dispatch(addPockets({ pocket: newPocket, upload }));

      if (!uploadCondition && !pocket.images.thumbnail) {
        dispatch(showErrorSnackbar(POCKETS_ERROR));
      }
    }
  });

  const unblock = useUnsavedChangesHandler(values);

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (data) => {
        setFieldValue('pocketImage', data.target.result);
        setPocketsImage(data.target.result);
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

  const onTagsChange = (_, value) => {
    const positionsData = value.map((position) => position._id);
    setFieldValue('positions', [...new Set(positionsData)]);
    setPositions(value);
  };

  const inputs = [{ label: labels.pocketsName, name: 'name' }];

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
                pathBack={pathToPockets}
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
            options={checkboxes(labels.labelsRestriction, labels.avaliable)}
          />
        </div>
        <Grid item xs={12}>
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
        </Grid>
        <Paper className={styles.inputPanel}>
          <Autocomplete
            id={labels.labelIdAut}
            className={styles.textField}
            multiple
            freeSolo
            filterSelectedOptions
            options={availablePositions}
            getOptionSelected={(option, value) => option._id === value._id}
            defaultValue={positions}
            onChange={onTagsChange}
            onBlur={handleBlur}
            getOptionLabel={(option) => `${option.name[0].value}`}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={materialUiConstants.outlined}
                label={labels.choosePositions.title}
                placeholder={labels.choosePositions.inputTitle}
                margin={labels.normal}
                fullWidth
                error={touched.labelIdAut && !!errors.positions}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{handleCircularProgress(loadingPositions)}</>
                }}
              />
            )}
          />
          {touched.labelIdAut && errors.positions && (
            <div
              data-cy={materialUiConstants.codeError}
              className={styles.error}
            >
              {errors.positions}
            </div>
          )}
        </Paper>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <AdditionalPriceContainer
          values={values}
          labels={labels}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
      </form>
    </div>
  );
};

PocketsForm.propTypes = {
  id: PropTypes.string,
  pocket: PropTypes.shape({
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    uaName: PropTypes.string,
    enName: PropTypes.string,
    restrictions: PropTypes.bool,
    optionType: PropTypes.string,
    positions: PropTypes.shape([]),
    additionalPrice: PropTypes.number
  }),
  values: PropTypes.shape({
    pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    restrictions: PropTypes.bool,
    optionType: PropTypes.string,
    positions: PropTypes.shape([]),
    additionalPrice: PropTypes.number
  }),
  errors: PropTypes.shape({
    pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    restrictions: PropTypes.bool,
    optionType: PropTypes.string,
    positions: PropTypes.shape([]),
    additionalPrice: PropTypes.number
  }),
  touched: PropTypes.shape({
    pocketsImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    restrictions: PropTypes.bool,
    optionType: PropTypes.string,
    positions: PropTypes.shape([]),
    additionalPrice: PropTypes.number
  }),
  edit: PropTypes.bool
};

PocketsForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  pocket: {
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
    restrictions: false,
    optionType: null,
    additionalPrice: [
      { value: null, type: 'ABSOLUTE_PRICE', currency: '' },
      { value: null, type: 'ABSOLUTE_PRICE', currencsy: '' }
    ],
    positions: []
  },
  edit: false
};

export default PocketsForm;
