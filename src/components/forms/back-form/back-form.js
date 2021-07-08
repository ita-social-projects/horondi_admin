import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import useBackHandlers from '../../../utils/use-back-handlers';
import { useStyles } from './back-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { addBack, updateBack } from '../../../redux/back/back.actions';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadPreviewContainer from '../../../containers/image-upload-container/image-upload-previewContainer';
import LanguagePanel from '../language-panel';
import { materialSelectorWithPagination } from '../../../redux/selectors/material.selectors';
import {
  getMaterials,
  getMaterialsByPurpose
} from '../../../redux/material/material.actions';
import LoadingBar from '../../loading-bar';
import {
  backUseEffectHandler,
  backFormOnSubmit,
  getBackInitialValues
} from '../../../utils/back-form';

import { checkInitialValue } from '../../../utils/check-initial-values';
import { getColors } from '../../../redux/color/color.actions';

const { IMG_URL } = config;
const { backName, material } = config.labels.back;
const map = require('lodash/map');

const {
  BACK_VALIDATION_ERROR,
  BACK_ERROR_MESSAGE,
  BACK_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  BACK_EN_NAME_MESSAGE,
  BACK_UA_NAME_MESSAGE
} = config.backErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const {
  languages,
  formRegExp: { enNameCreation, uaNameCreation, backMaterial },
  imagePrefix
} = config;

const { pathToBacks } = config.routes;

const BackForm = ({ back, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { list, loading, currentPage, rowsPerPage, filters } = useSelector(
    materialSelectorWithPagination
  );

  useEffect(() => {
    dispatch(
      getMaterials({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter: {
          colors: filters.colors,
          name: filters.name,
          available: filters.available,
          purpose: filters.purpose
        }
      })
    );
  }, [dispatch, rowsPerPage, currentPage, filters]);

  const { createBack, setUpload, upload, backImage, setBackImage } =
    useBackHandlers();

  useEffect(() => {
    dispatch(getMaterialsByPurpose());
  }, []);

  useEffect(() => {
    dispatch(getColors());
  }, []);

  useEffect(() => {
    backUseEffectHandler(back, setBackImage, imagePrefix);
  }, [dispatch, back]);

  const backValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(enNameCreation, BACK_EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(uaNameCreation, BACK_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .matches(backMaterial, BACK_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BACK_ERROR_MESSAGE),
    available: Yup.boolean(),
    customizable: Yup.boolean(),
    backImage: Yup.string().required(PHOTO_NOT_PROVIDED)
  });

  const { values, handleSubmit, handleChange, touched, errors, setFieldValue } =
    useFormik({
      validationSchema: backValidationSchema,
      initialValues: getBackInitialValues(isEdit, IMG_URL, back),

      onSubmit: () => {
        const newBack = createBack(values);
        const isEditAndUpload = isEdit && upload instanceof File;
        if (isEditAndUpload || isEdit) {
          backFormOnSubmit(
            isEditAndUpload,
            dispatch,
            updateBack,
            {
              id,
              back: newBack,
              image: upload
            },
            isEdit,
            {
              id,
              back: newBack
            }
          );
          return;
        }
        dispatch(
          addBack({
            back: newBack,
            image: upload
          })
        );
      }
    });

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.back.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const handleImageLoad = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('backImage', event.target.result);
        setBackImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  const inputs = [{ label: backName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };

  const imageUploadBackInputsId = {
    backImageInput: 'backImageInput'
  };

  const valueEquality = checkInitialValue(
    getBackInitialValues(isEdit, IMG_URL, back),
    values
  );

  return (
    <div>
      {loading ? (
        <LoadingBar />
      ) : (
        <form onSubmit={handleSubmit}>
          <CheckboxOptions options={checkboxes} />

          <Grid item xs={12}>
            <Paper className={styles.backItemUpdate}>
              <div className={styles.imageUploadBlock}>
                <div>
                  <span className={styles.imageUpload}>
                    {config.labels.back.avatarText}
                  </span>

                  <div className={styles.imageUploadAvatar}>
                    <ImageUploadPreviewContainer
                      handler={handleImageLoad}
                      src={backImage}
                      id={imageUploadBackInputsId.backImageInput}
                    />
                    {touched.backImage && errors.backImage && (
                      <div className={styles.inputError}>
                        {errors.backImage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <FormControl
            variant='outlined'
            className={`${styles.formControl} ${styles.materialSelect}`}
          >
            <InputLabel variant='outlined'>{material}</InputLabel>
            <Select
              label={material}
              data-cy='material'
              name='material'
              error={touched.material && !!errors.material}
              value={values.material || []}
              onChange={handleChange}
            >
              {list.map(({ _id, name }) => (
                <MenuItem key={_id} value={_id}>
                  {name[0].value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {touched.material && errors.material && (
            <div data-cy='material-error' className={styles.inputError}>
              {errors.material}
            </div>
          )}

          {map(languages, (lang) => (
            <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
          ))}
          <BackButton initial={!valueEquality} pathBack={pathToBacks} />
          <SaveButton
            className={styles.saveButton}
            data-cy='save-btn'
            type='submit'
            title={SAVE_TITLE}
            values={values}
            errors={errors}
          />
        </form>
      )}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
BackForm.propTypes = {
  id: PropTypes.string,
  back: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    customizable: PropTypes.bool,
    features: PropTypes.shape({
      material: PropTypes.string,
      color: PropTypes.string
    }),
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    backImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  errors: PropTypes.shape({
    backImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  touched: PropTypes.shape({
    backImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  isEdit: PropTypes.bool
};
BackForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  back: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    images: {
      thumbnail: ''
    },
    features: {
      material: {
        name: [
          {
            value: ''
          },
          {
            value: ''
          }
        ]
      },
      color: {
        name: [
          {
            value: ''
          },
          {
            value: ''
          }
        ]
      }
    },
    optionType: 'BACK',
    available: false,
    customizable: false
  },
  isEdit: false
};

export default BackForm;
