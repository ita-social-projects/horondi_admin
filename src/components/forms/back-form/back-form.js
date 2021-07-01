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
import { materialSelector } from '../../../redux/selectors/material.selectors';
import { getMaterialsByPurpose } from '../../../redux/material/material.actions';
import LoadingBar from '../../loading-bar';
import {
  handleImageLoad,
  backUseEffectHandler,
  backFormOnSubmit,
  useFormikInitialValues
} from '../../../utils/back-form';
import { checkInitialValue } from '../../../utils/check-initial-values';

const { backName, material, backDescription } = config.labels.back;
const map = require('lodash/map');

const {
  BACK_VALIDATION_ERROR,
  BACK_ERROR_MESSAGE,
  BACK_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  CONSTRUCTOR_PHOTO_NOT_PROVIDED,
  BACK_EN_NAME_MESSAGE,
  BACK_UA_NAME_MESSAGE
} = config.backErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const {
  languages,
  formRegExp: { enNameCreation, uaNameCreation, patternMaterial },
  imagePrefix
} = config;

const { pathToBacks } = config.routes;

const BackForm = ({ back, id, isEdit }) => {
  console.log(back);
  const styles = useStyles();
  const dispatch = useDispatch();
  const { materialsByPurpose, loading } = useSelector(materialSelector);
  const {
    createBack,
    setUpload,
    upload,
    backImage,
    setBackImage,
    constructorImg,
    setConstructorImg,
    uploadConstructorImg,
    setUploadConstructorImg
  } = useBackHandlers();

  useEffect(() => {
    dispatch(getMaterialsByPurpose());
  }, []);

  useEffect(() => {
    backUseEffectHandler(back, setBackImage, setConstructorImg, imagePrefix);
  }, [dispatch, back]);

  const backValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(enNameCreation, BACK_EN_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(enNameCreation, BACK_EN_NAME_MESSAGE),
    uaDescription: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(uaNameCreation, BACK_UA_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(uaNameCreation, BACK_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .matches(patternMaterial, BACK_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BACK_ERROR_MESSAGE),
    handmade: Yup.boolean(),
    patternImage: Yup.string().required(PHOTO_NOT_PROVIDED),
    patternConstructorImage: Yup.string().required(
      CONSTRUCTOR_PHOTO_NOT_PROVIDED
    )
  });

  const { values, handleSubmit, handleChange, touched, errors, setFieldValue } =
    useFormik({
      validationSchema: backValidationSchema,
      initialValues: useFormikInitialValues(back),
      onSubmit: () => {
        const newBack = createBack(values);
        const isEditAndUploadAndConstructor =
          isEdit &&
          upload instanceof File &&
          uploadConstructorImg instanceof File;
        if (isEditAndUploadAndConstructor || isEdit) {
          backFormOnSubmit(
            isEditAndUploadAndConstructor,
            dispatch,
            updateBack,
            {
              id,
              back: newBack,
              image: [upload, uploadConstructorImg]
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
            image: [upload, uploadConstructorImg]
          })
        );
      }
    });

  const checkboxes = [
    {
      id: 'handmade',
      dataCy: 'handmade',
      value: values.handmade,
      checked: values.handmade,
      color: 'primary',
      label: config.labels.back.handmade,
      handler: () => setFieldValue('handmade', !values.handmade)
    },
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

  const handleLoadMainImage = (e) => {
    handleImageLoad(e, (event) => {
      setFieldValue('backImage', event.target.result);
      setBackImage(event.target.result);
    });
    setUpload(e.target.files[0]);
  };

  const handleLoadConstructorImage = (e) => {
    handleImageLoad(e, (event) => {
      setFieldValue('patternConstructorImage', event.target.result);
      setConstructorImg(event.target.result);
    });
    setUploadConstructorImg(e.target.files[0]);
  };

  const inputs = [
    { label: backName, name: 'name' },
    { label: backDescription, name: 'description' }
  ];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };

  const imageUploadBackInputsId = {
    backImageInput: 'backImageInput',
    constructorImageInput: 'constructorImgInput'
  };

  const valueEquality = checkInitialValue(useFormikInitialValues(back), values);

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
                      handler={handleLoadMainImage}
                      src={backImage}
                      id={imageUploadBackInputsId.patternImageInput}
                    />
                    {touched.backImage && errors.backImage && (
                      <div className={styles.inputError}>
                        {errors.backImage}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <span className={styles.imageUpload}>
                    {config.labels.back.constructorImgText}
                  </span>

                  <div className={styles.imageUploadAvatar}>
                    <ImageUploadPreviewContainer
                      handler={handleLoadConstructorImage}
                      src={constructorImg}
                      id={imageUploadBackInputsId.constructorImageInput}
                    />
                    {touched.backConstructorImage &&
                      errors.backConstructorImage && (
                        <div className={styles.inputError}>
                          {errors.backConstructorImage}
                        </div>
                      )}
                  </div>
                </div>
              </div>
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
                  {materialsByPurpose.map(({ _id, name }) => (
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
            </Paper>
          </Grid>
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
    description: PropTypes.arrayOf(valueShape),
    features: PropTypes.shape({
      material: PropTypes.string,
      handmade: PropTypes.bool
    }),
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    constructorImg: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    backImage: PropTypes.string,
    material: PropTypes.string,
    handmade: PropTypes.bool,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    backConstructorImage: PropTypes.string
  }),
  errors: PropTypes.shape({
    backImage: PropTypes.string,
    material: PropTypes.string,
    handmade: PropTypes.bool,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    backConstructorImage: PropTypes.string
  }),
  touched: PropTypes.shape({
    backImage: PropTypes.string,
    material: PropTypes.string,
    handmade: PropTypes.bool,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    backConstructorImage: PropTypes.string
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
    description: [
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
    constructorImg: '',
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
      handmade: false
    },
    available: false
  },
  isEdit: false
};

export default BackForm;
