import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStyles } from './material-about-add-form.styles';
import { BackButton, SaveButton } from '../../buttons';
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
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
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
  const { languages, materialUiConstants } = config;
  const { titleInput, textInput, imgTitle } = config.labels.materialAbout;
  const { SAVE_TITLE } = config.buttonTitles;

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
        setFieldValue('img', event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const unblock = useUnsavedChangesHandler(values);

  if (materialAboutLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <BackButton pathBack={pathToAboutMaterials} />
          </Grid>
          <Grid item className={styles.button}>
            <SaveButton
              data-cy='save-btn'
              title={SAVE_TITLE}
              type={materialUiConstants.types.submit}
              values={values}
              errors={errors}
              onClickHandler={submitForm}
              unblockFunction={unblock}
              disabled={!dirty || !isValid}
            />
          </Grid>
        </Grid>
      </div>
      <form>
        <Grid container>
          <Grid item xs={12}>
            {languages.map((lang) => (
              <LanguagePanel
                key={lang}
                lang={lang}
                inputOptions={inputOptions}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <div className={styles.imgTitle}>{imgTitle}</div>
            <Paper className={styles.paper}>
              <ImageUploadContainer
                src={values.img}
                handler={handleImageLoad}
              />
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
