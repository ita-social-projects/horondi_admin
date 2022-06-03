import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../about-us-forms.styles';
import {
  updateBusinessText,
  deleteFiles
} from '../operations/about-us.mutation';
import {
  showSuccessSnackbar,
  showErrorSnackbar
} from '../../../../redux/snackbar/snackbar.actions';
import { businessPageShape } from '../../../../propTypes/about-us';
import {
  getInitialValuesForFooterImgEdit,
  getBusinessPageWithUpdatedFooterImg,
  setVariablesForUpdatingPage,
  getFooterImgNames
} from '../../../../utils/about-us-helper';
import EditingButtonsPanel from '../../../editing-buttons-panel';
import LoadingBar from '../../../loading-bar';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import { footerImgEditValidationSchema } from '../../../../validations/about-us/about-us-edit-validation';
import { config } from '../../../../configs';

const { pathToAboutUs } = config.routes;
const { SUCCESS_UPDATE_STATUS } = config.statuses;
const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;
const { img } = config.labels.aboutUs;

const AboutUsFooterImgEditForm = ({ businessPage }) => {
  const [businessPageData, setBusinessPageData] = useState(businessPage);
  const [upload, setUpload] = useState();
  const styles = useStyles();
  const dispatch = useDispatch();

  const [updateSection, { loading: updateSectionLoading }] = useMutation(
    updateBusinessText,
    {
      onCompleted: (data) => {
        if (data?.updateBusinessText?.message) {
          dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
        } else {
          setBusinessPageData(data.updateBusinessText);
          dispatch(showSuccessSnackbar(SUCCESS_UPDATE_STATUS));
        }
      },
      onError: () => {
        dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
      }
    }
  );

  const [deleteImg, { loading: deleteImgLoading }] = useMutation(deleteFiles);

  const onSubmit = () => {
    const imgNames = getFooterImgNames(businessPageData);
    deleteImg({ variables: { fileNames: imgNames } });

    const updatedBusinessPage = getBusinessPageWithUpdatedFooterImg(
      businessPageData,
      upload?.name
    );

    const variables = setVariablesForUpdatingPage(updatedBusinessPage, [
      upload
    ]);

    updateSection({
      variables
    });
  };

  const { values, errors, setFieldValue, submitForm } = useFormik({
    initialValues: getInitialValuesForFooterImgEdit(businessPageData),
    validationSchema: footerImgEditValidationSchema,
    onSubmit
  });

  const handleImageLoad = (files) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFieldValue(img, event.target.result);
    };
    reader.readAsDataURL(files[0]);
    setUpload(files[0]);
  };

  if (updateSectionLoading || deleteImgLoading) {
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

AboutUsFooterImgEditForm.propTypes = {
  businessPage: businessPageShape.isRequired
};

export default AboutUsFooterImgEditForm;
