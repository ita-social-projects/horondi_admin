/* eslint-disable react/prop-types */
// TODO: Implement propTypes
import React from 'react';
import MaterialsWithColorContainer from '../materials-with-color-container';
import AutoCompleteOptions from '../../components/autocomplete-options/autocomplete-options';

const ConstructorFeaturesContainer = ({
  materialsPurpose,
  setIsLoading,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  featuresLabels,
  variant
}) => {
  let featuresContainer;

  switch (variant) {
    case 'materialsWithColor':
      featuresContainer = (
        <MaterialsWithColorContainer
          setIsLoading={setIsLoading}
          materialsPurpose={materialsPurpose}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          materialLabels={featuresLabels}
        />
      );
      break;

    case 'autocompleteOptions':
      featuresContainer = (
        <AutoCompleteOptions
          autocompleteLabels={featuresLabels}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
      );
      break;

    default:
      return null;
  }
  return <>{featuresContainer}</>;
};

export default ConstructorFeaturesContainer;
