import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './product-info-container.styles';

import { config } from '../../configs';
import { productsTranslations } from '../../translations/product.translations';
import LanguagePanel from '../../components/forms/language-panel';

const {
  labels: {
    product: { infoLabels }
  },
  languages
} = config;

const { CORRECT_DATA_ERROR } = productsTranslations;

const ProductInfoContainer = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit
}) => {
  const styles = useStyles();

  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs: infoLabels
  };

  const inputsList = languages.map((lang, idx) => (
    <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
  ));

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {inputsList}
      <div className={styles.error}>
        {!!Object.keys(errors).length && CORRECT_DATA_ERROR}
      </div>
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
  handleSubmit: PropTypes.func.isRequired
};

ProductInfoContainer.defaultProps = {};

export default ProductInfoContainer;
