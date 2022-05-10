import React from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { businessPageShape } from '../../../../propTypes/about-us';
import { titleEditValidationSchema } from '../../../../validations/about-us/about-us-edit-validation';
import LanguagePanel from '../../language-panel';
import EditingButtonsPanel from '../../../editing-buttons-panel';
import {
  showSuccessSnackbar,
  showErrorSnackbar
} from '../../../../redux/snackbar/snackbar.actions';
import LoadingBar from '../../../loading-bar';
import { updateBusinessTextByCode } from '../operations/about-us.mutation';
import {
  getInitialValuesForTitleEditing,
  getBusinessPageWithUpdatedTitle,
  setVariablesForUpdatingPage
} from '../../../../utils/about-us-helper';
import { config } from '../../../../configs';

const { pathToAboutUs } = config.routes;
const { SUCCESS_UPDATE_STATUS } = config.statuses;
const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;
const { languages } = config;
const { titleEditInput } = config.labels.aboutUs;

const AboutUsTitleEditForm = ({ businessPage }) => {
  const dispatch = useDispatch();

  const [updateTitle, { loading }] = useMutation(updateBusinessTextByCode, {
    onCompleted: (_data) => {
      dispatch(showSuccessSnackbar(SUCCESS_UPDATE_STATUS));
    },
    onError: (_err) => {
      dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
    }
  });

  const { values, errors, touched, handleChange, handleBlur, submitForm } =
    useFormik({
      initialValues: getInitialValuesForTitleEditing(businessPage),
      validationSchema: titleEditValidationSchema,
      onSubmit
    });

  function onSubmit(values) {
    const updatedBusinessPage = getBusinessPageWithUpdatedTitle(
      businessPage,
      values
    );
    updateTitle({
      variables: setVariablesForUpdatingPage(updatedBusinessPage)
    });
  }

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs: [titleEditInput]
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
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
      </form>
    </div>
  );
};

AboutUsTitleEditForm.propTypes = {
  businessPage: businessPageShape.isRequired
};

export default AboutUsTitleEditForm;
