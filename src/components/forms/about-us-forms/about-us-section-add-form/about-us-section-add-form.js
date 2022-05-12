import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../about-us-forms.styles';
import { updateBusinessTextByCode } from '../operations/about-us.mutation';
import { showErrorSnackbar } from '../../../../redux/snackbar/snackbar.actions';
import { businessPageShape } from '../../../../propTypes/about-us';
import {
  getInitialValuesForSectionAdd,
  getBusinessPageWithNewSection,
  setVariablesForUpdatingPage
} from '../../../../utils/about-us-helper';
import EditingButtonsPanel from '../../../editing-buttons-panel';
import LoadingBar from '../../../loading-bar';
import LanguagePanel from '../../language-panel';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import { sectionValidationSchema } from '../../../../validations/about-us/about-us-edit-validation';
import { config } from '../../../../configs';

const { pathToAboutUs } = config.routes;
const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;
const { titleEditInput, textEditInput, img } = config.labels.aboutUs;
const { languages } = config;

const AboutUsSectionAddForm = ({ businessPage }) => {
  const [upload, setUpload] = useState();
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [updateSection, { loading }] = useMutation(updateBusinessTextByCode, {
    onCompleted: (data) => {
      if (data?.updateBusinessText?.message) {
        dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
      } else {
        history.push(pathToAboutUs);
      }
    },
    onError: (_err) => {
      dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
    }
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    submitForm
  } = useFormik({
    initialValues: getInitialValuesForSectionAdd(),
    validationSchema: sectionValidationSchema,
    onSubmit
  });

  function onSubmit(onSubmitValues) {
    const updatedBusinessPage = getBusinessPageWithNewSection(
      businessPage,
      onSubmitValues,
      upload.name
    );

    const variables = setVariablesForUpdatingPage(updatedBusinessPage, [
      upload
    ]);

    updateSection({
      variables
    });
  }

  const handleImageLoad = (files) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFieldValue(img, event.target.result);
    };
    reader.readAsDataURL(files[0]);
    setUpload(files[0]);
  };

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs: [titleEditInput, textEditInput],
    setFieldValue
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <EditingButtonsPanel
        pathBack={pathToAboutUs}
        submitForm={submitForm}
        values={values}
        errors={errors}
      />
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {languages.map((lang) => (
              <LanguagePanel
                lang={lang}
                inputOptions={inputOptions}
                key={lang}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.title} variant='h5'>
              {img.toUpperCase()}
            </Typography>
            <Paper className={styles.paper}>
              <div className={styles.imageUploadContainer}>
                <ImageUploadContainer
                  handler={handleImageLoad}
                  src={values.img}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

AboutUsSectionAddForm.propTypes = {
  businessPage: businessPageShape.isRequired
};

export default AboutUsSectionAddForm;
