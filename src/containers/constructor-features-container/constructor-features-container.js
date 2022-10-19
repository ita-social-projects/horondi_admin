import React from 'react';
import PropTypes from 'prop-types';
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

ConstructorFeaturesContainer.propTypes = {
  materialsPurpose: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  featuresLabels: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.string
};

ConstructorFeaturesContainer.defaultProps = {
  variant: '',
  featuresLabels: null
};

export default ConstructorFeaturesContainer;
