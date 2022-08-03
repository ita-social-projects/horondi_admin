/* eslint-disable react/prop-types */
// TODO: Implement propTypes
import React from 'react';
import MaterialsWithColorContainer from '../materials-with-color-container';

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

    default:
      break;
  }
  return <>{featuresContainer}</>;
};

export default ConstructorFeaturesContainer;
