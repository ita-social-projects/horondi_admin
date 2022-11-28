import React from 'react';
import PropTypes from 'prop-types';

import { noop } from 'lodash';
import { useStyles } from './product-info-container.styles';

import { config } from '../../configs';
import LanguagePanel from '../../components/forms/language-panel';
import productContainersTypes from '../../propTypes/product-containers';

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
  ...productContainersTypes
};

ProductInfoContainer.defaultProps = {
  handleBlur: noop,
  setFieldValue: noop
};

export default ProductInfoContainer;
