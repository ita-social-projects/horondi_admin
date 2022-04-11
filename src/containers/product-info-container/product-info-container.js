import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'lodash';
import { useStyles } from './product-info-container.styles';

import { config } from '../../configs';
import LanguagePanel from '../../components/forms/language-panel';

const {
  labels: {
    product: { infoLabels }
  },
  languages
} = config;

const ProductInfoContainer = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  setFieldValue
}) => {
  const styles = useStyles();

  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs: infoLabels,
    handleBlur,
    setFieldValue
  };

  const inputsList = languages.map((lang) => (
    <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
  ));

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {inputsList}
    </form>
  );
};

ProductInfoContainer.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  setFieldValue: PropTypes.func
};

ProductInfoContainer.defaultProps = {
  handleBlur: noop,
  setFieldValue: noop
};

export default ProductInfoContainer;
