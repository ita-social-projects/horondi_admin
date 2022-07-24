import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStyles } from './material-about-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import LoadingBar from '../../loading-bar';
import { validationSchema } from '../../../validations/material-about/material-about-validation';
import {
  ADD_MATERIALS_BLOCK,
  UPDATE_MATERIALS_BLOCK
} from '../../../pages/material/operations/materials-page.mutations';
import {
  getInitialValuesForMaterialsBlock,
  setVariablesForMaterialsBlock
} from '../../../utils/material-about';
import {
  showSuccessSnackbar,
  showErrorSnackbar
} from '../../../redux/snackbar/snackbar.actions';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import { config } from '../../../configs';

const MaterialAboutForm = ({ currentType, selectedBlock, editMode }) => {
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

  const MUTATION = editMode ? UPDATE_MATERIALS_BLOCK : ADD_MATERIALS_BLOCK;

  const [addMaterialAboutBlock, { loading: materialAboutLoading }] =
    useMutation(MUTATION, {
      onCompleted: () => {
        dispatch(showSuccessSnackbar(SUCCESS_UPDATE_STATUS));
        history.push(pathToAboutMaterials);
      },
      onError: () => {
        dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
      }
    });

  const onSubmit = async () => {
    addMaterialAboutBlock({
      variables: {
        ...(editMode && { id: selectedBlock._id }),
        materialsBlock: setVariablesForMaterialsBlock(values, currentType),
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
    initialValues: getInitialValuesForMaterialsBlock(selectedBlock),
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

const blockShape = PropTypes.shape({
  _id: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.arrayOf(
    PropTypes.shape({
      lang: PropTypes.string,
      value: PropTypes.string
    })
  ),
  image: PropTypes.shape({
    small: PropTypes.string
  })
});

MaterialAboutForm.propTypes = {
  currentType: PropTypes.string.isRequired,
  selectedBlock: blockShape,
  editMode: PropTypes.bool
};
MaterialAboutForm.defaultProps = {
  selectedBlock: {},
  editMode: false
};

export default MaterialAboutForm;
