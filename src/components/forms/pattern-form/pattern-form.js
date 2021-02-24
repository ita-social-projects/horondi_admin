import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid, Avatar } from '@material-ui/core';
import * as Yup from 'yup';
import { Image } from '@material-ui/icons';
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
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import { materialSelector } from '../../../redux/selectors/material.selectors';
import { getMaterialsByPurpose } from '../../../redux/material/material.actions';
import LoadingBar from '../../loading-bar';

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
    if (pattern.images.thumbnail) {
      setPatternImage(`${imagePrefix}${pattern.images.thumbnail}`);
    }
    if (pattern.constructorImg) {
      setConstructorImg(`${imagePrefix}${pattern.constructorImg}`);
    }
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
    patternImage: Yup.string().required(PHOTO_NOT_PROVIDED),
    patternConstructorImage: Yup.string().required(
      CONSTRUCTOR_PHOTO_NOT_PROVIDED
    )
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: patternValidationSchema,
    initialValues: {
      patternConstructorImage: pattern.constructorImg || '',
      patternImage: pattern.images.thumbnail || '',
      uaName: pattern.name[0].value || '',
      enName: pattern.name[1].value || '',
      uaDescription: pattern.description[0].value || '',
      enDescription: pattern.description[1].value || '',
      material: pattern.material._id || '',
      available: pattern.available || false,
      handmade: pattern.handmade || false
    },
    onSubmit: () => {
      const newPattern = createPattern(values);

      if (
        isEdit &&
        upload instanceof File &&
        uploadConstructorImg instanceof File
      ) {
        dispatch(
          updatePattern({
            id,
            pattern: newPattern,
            image: [upload, uploadConstructorImg]
          })
        );
        return;
      }
      if (isEdit) {
        dispatch(updatePattern({ id, pattern: newPattern }));
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

  const handleImageLoad = (e, callback) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        callback(event);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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

  return (
    <div>
      {loading ? (
        <LoadingBar />
      ) : (
        <form onSubmit={handleSubmit}>
          <CheckboxOptions options={checkboxes} />

          <Grid item xs={12}>
            <Paper className={styles.patternItemUpdate}>
              <div>
                <span className={styles.imageUpload}>
                  {config.labels.pattern.avatarText}
                </span>
                <div className={styles.imageUploadAvatar}>
                  <ImageUploadContainer handler={handleLoadMainImage} />
                  {patternImage && (
                    <Avatar src={patternImage}>
                      <Image />
                    </Avatar>
                  )}
                  {touched.patternImage && errors.patternImage && (
                    <div className={styles.inputError}>
                      {errors.patternImage}
                    </div>
                  )}
                </div>

                <span className={styles.imageUpload}>
                  {config.labels.pattern.constructorImgText}
                </span>
                <div className={styles.imageUploadAvatar}>
                  <ImageUploadContainer handler={handleLoadConstructorImage} />
                  {constructorImg && (
                    <Avatar src={constructorImg}>
                      <Image />
                    </Avatar>
                  )}
                  {touched.patternConstructorImage &&
                    errors.patternConstructorImage && (
                    <div className={styles.inputError}>
                      {errors.patternConstructorImage}
                    </div>
                  )}
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
          <BackButton />
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
PatternForm.propTypes = {
  id: PropTypes.string,
  pattern: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    handmade: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    constructorImg: PropTypes.string,
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    patternConstructorImage: PropTypes.string
  }),
  errors: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    patternConstructorImage: PropTypes.string
  }),
  touched: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
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
    available: false,
    handmade: false
  },
  isEdit: false
};

export default PatternForm;
