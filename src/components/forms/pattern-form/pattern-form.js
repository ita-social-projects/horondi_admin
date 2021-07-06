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
import usePatternHandlers from '../../../utils/use-pattern-handlers';
import { useStyles } from './pattern-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addPattern,
  updatePattern
} from '../../../redux/pattern/pattern.actions';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadPreviewContainer from '../../../containers/image-upload-container/image-upload-previewContainer';
import LanguagePanel from '../language-panel';
import { materialSelector } from '../../../redux/selectors/material.selectors';
import { getMaterialsByPurpose } from '../../../redux/material/material.actions';
import LoadingBar from '../../loading-bar';
import {
  handleImageLoad,
  patternUseEffectHandler,
  patternFormOnSubmit,
  useFormikInitialValues
} from '../../../utils/pattern-form';
import { checkInitialValue } from '../../../utils/check-initial-values';

const { patternName, material, patternDescription } = config.labels.pattern;
const map = require('lodash/map');

const {
  PATTERN_VALIDATION_ERROR,
  PATTERN_ERROR_MESSAGE,
  PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  CONSTRUCTOR_PHOTO_NOT_PROVIDED,
  PATTERN_EN_NAME_MESSAGE,
  PATTERN_UA_NAME_MESSAGE
} = config.patternErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const {
  languages,
  formRegExp: { enNameCreation, uaNameCreation, patternMaterial },
  imagePrefix
} = config;

const { pathToPatterns } = config.routes;

const PatternForm = ({ pattern, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { materialsByPurpose, loading } = useSelector(materialSelector);
  const {
    createPattern,
    setUpload,
    upload,
    patternImage,
    setPatternImage,
    constructorImg,
    setConstructorImg,
    uploadConstructorImg,
    setUploadConstructorImg
  } = usePatternHandlers();

  useEffect(() => {
    dispatch(getMaterialsByPurpose());
  }, []);

  useEffect(() => {
    patternUseEffectHandler(
      pattern,
      setPatternImage,
      setConstructorImg,
      imagePrefix
    );
  }, [dispatch, pattern]);

  const patternValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(enNameCreation, PATTERN_EN_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(enNameCreation, PATTERN_EN_NAME_MESSAGE),
    uaDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(uaNameCreation, PATTERN_UA_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(uaNameCreation, PATTERN_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .matches(patternMaterial, PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(PATTERN_ERROR_MESSAGE),
    handmade: Yup.boolean(),
    patternImage: Yup.string().required(PHOTO_NOT_PROVIDED),
    patternConstructorImage: Yup.string().required(
      CONSTRUCTOR_PHOTO_NOT_PROVIDED
    )
  });

  const { values, handleSubmit, handleChange, touched, errors, setFieldValue } =
    useFormik({
      validationSchema: patternValidationSchema,
      initialValues: useFormikInitialValues(pattern),
      onSubmit: () => {
        const newPattern = createPattern(values);
        const isEditAndUploadAndConstructor =
          isEdit &&
          upload instanceof File &&
          uploadConstructorImg instanceof File;
        if (isEditAndUploadAndConstructor || isEdit) {
          patternFormOnSubmit(
            isEditAndUploadAndConstructor,
            dispatch,
            updatePattern,
            {
              id,
              pattern: newPattern,
              image: [upload, uploadConstructorImg]
            },
            isEdit,
            {
              id,
              pattern: newPattern
            }
          );
          return;
        }
        dispatch(
          addPattern({
            pattern: newPattern,
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
      label: config.labels.pattern.handmade,
      handler: () => setFieldValue('handmade', !values.handmade)
    },
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.pattern.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const handleLoadMainImage = (e) => {
    handleImageLoad(e, (event) => {
      setFieldValue('patternImage', event.target.result);
      setPatternImage(event.target.result);
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
    { label: patternName, name: 'name' },
    { label: patternDescription, name: 'description' }
  ];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };

  const imageUploadPatternInputsId = {
    patternImageInput: 'patternImageInput',
    constructorImageInput: 'constructorImgInput'
  };

  const valueEquality = checkInitialValue(
    useFormikInitialValues(pattern),
    values
  );

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {loading ? (
        <LoadingBar />
      ) : (
        <form onSubmit={(e) => eventPreventHandler(e)}>
          <div className={styles.buttonContainer}>
            <Grid container spacing={2} className={styles.fixedButtons}>
              <Grid item className={styles.button}>
                <BackButton
                  initial={!valueEquality}
                  pathBack={pathToPatterns}
                />
              </Grid>
              <Grid item className={styles.button}>
                <SaveButton
                  data-cy='save-btn'
                  type='submit'
                  onClickHandler={handleSubmit}
                  title={SAVE_TITLE}
                  values={values}
                  errors={errors}
                />
              </Grid>
            </Grid>
          </div>
          <span className={styles.patternTitle}>
            {config.titles.patternTitles.createPageTitle}
          </span>
          <div>
            <CheckboxOptions options={checkboxes} />
          </div>
          <Grid item xs={12}>
            <Paper className={styles.patternItemUpdate}>
              <div className={styles.imageUploadBlock}>
                <div>
                  <span className={styles.imageUpload}>
                    {config.labels.pattern.avatarText}
                  </span>

                  <div className={styles.imageUploadAvatar}>
                    <ImageUploadPreviewContainer
                      handler={handleLoadMainImage}
                      src={patternImage}
                      id={imageUploadPatternInputsId.patternImageInput}
                    />
                    {touched.patternImage && errors.patternImage && (
                      <div className={styles.inputError}>
                        {errors.patternImage}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <span className={styles.imageUpload}>
                    {config.labels.pattern.constructorImgText}
                  </span>

                  <div className={styles.imageUploadAvatar}>
                    <ImageUploadPreviewContainer
                      handler={handleLoadConstructorImage}
                      src={constructorImg}
                      id={imageUploadPatternInputsId.constructorImageInput}
                    />
                    {touched.patternConstructorImage &&
                      errors.patternConstructorImage && (
                        <div className={styles.inputError}>
                          {errors.patternConstructorImage}
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
        </form>
      )}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
PatternForm.propTypes = {
  id: PropTypes.string,
  pattern: PropTypes.shape({
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
    patternImage: PropTypes.string,
    material: PropTypes.string,
    handmade: PropTypes.bool,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    patternConstructorImage: PropTypes.string
  }),
  errors: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    handmade: PropTypes.bool,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    patternConstructorImage: PropTypes.string
  }),
  touched: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    handmade: PropTypes.bool,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    patternConstructorImage: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  isEdit: PropTypes.bool
};
PatternForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  pattern: {
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

export default PatternForm;
