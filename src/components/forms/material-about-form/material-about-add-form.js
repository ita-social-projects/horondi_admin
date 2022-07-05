import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStyles } from './material-about-add-form.styles';
import EditingButtonsPanel from '../../editing-buttons-panel';
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import LoadingBar from '../../loading-bar';
import { validationSchema } from '../../../validations/material-about/material-about-validation';
import { ADD_MATERIALS_BLOCK } from '../../../pages/material/operations/materials-page.mutations';
import {
  getInitialValuesForMaterialsAdd,
  setVariablesForMaterialsAdd
} from '../../../utils/material-about';
import {
  showSuccessSnackbar,
  showErrorSnackbar
} from '../../../redux/snackbar/snackbar.actions';
import { config } from '../../../configs';

const MaterialAboutAddForm = ({ currentType }) => {
  const [upload, setUpload] = useState();
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();

  const { SUCCESS_UPDATE_STATUS } = config.statuses;
  const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;
  const { pathToAboutMaterialsMain, pathToAboutMaterialsBottom } =
    config.routes;
  const { languages } = config;
  const { titleInput, textInput, img } = config.labels.materialAbout;

  const pathToAboutMaterials =
    currentType === 'main'
      ? pathToAboutMaterialsMain
      : pathToAboutMaterialsBottom;

  const [
    addMaterialAboutBlock,
    { error: materialAboutError, loading: materialAboutLoading }
  ] = useMutation(ADD_MATERIALS_BLOCK, {
    onCompleted: (data) => {
      if (data?.addMaterialAboutBlock?.message || materialAboutError) {
        dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
      } else {
        dispatch(showSuccessSnackbar(SUCCESS_UPDATE_STATUS));
        history.push(pathToAboutMaterials);
      }
    },
    onError: () => {
      dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
    }
  });

  const onSubmit = async () => {
    addMaterialAboutBlock({
      variables: {
        materialsBlock: setVariablesForMaterialsAdd(values, currentType),
        image: upload
      }
    });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    dirty,
    isValid,
    submitForm
  } = useFormik({
    initialValues: getInitialValuesForMaterialsAdd(),
    validationSchema,
    onSubmit
  });

  const inputOptions = {
    errors,
    touched,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    values,
    inputs: [titleInput, textInput],
    setFieldValue
  };

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue(img, event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  if (materialAboutLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <EditingButtonsPanel
        pathBack={pathToAboutMaterials}
        submitForm={submitForm}
        values={values}
        errors={errors}
        dirty={dirty}
        isValid={isValid}
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

MaterialAboutAddForm.propTypes = {
  currentType: PropTypes.string.isRequired
};

export default MaterialAboutAddForm;
