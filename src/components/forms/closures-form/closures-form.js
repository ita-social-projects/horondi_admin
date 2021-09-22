import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid } from '@material-ui/core';
import * as Yup from 'yup';
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
import AdditionalPriceContainer from '../../../containers/additional-price-container';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const { convertationTitle } = config.titles.backTitles;
const labels = { ...config.labels.closuresPageLabel, convertationTitle };

const { PHOTO_NOT_PROVIDED } = config.closuresErrorMessages;

const {
  ERROR_MESSAGE,
  UA_NAME_MESSAGE,
  EN_NAME_MESSAGE,
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  PRICE_ERROR
} = config.commonErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages, IMG_URL } = config;

const { enNameCreation, uaNameCreation } = config.formRegExp;

const ClosuresForm = ({ closure, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { createClosures, setUpload, upload, closuresImage, setClosuresImage } =
    useClosuresHandlers();

  const { pathToClosures } = config.routes;

  const closuresValidationSchema = Yup.object().shape({
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
    additionalPriceType: Yup.string(),
    additionalPrice: Yup.string()
      .required(ERROR_MESSAGE)
      .matches(config.formRegExp.onlyPositiveFloat, PRICE_ERROR)
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

  const changed = useChangedValuesChecker(values, errors);
  const unblock = useUnsavedChangesHandler(values);

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
                {...(id ? { disabled: !changed } : {})}
                unblockFunction={unblock}
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
