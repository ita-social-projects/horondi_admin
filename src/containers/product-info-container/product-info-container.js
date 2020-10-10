import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper, Tabs, Tab, Box } from '@material-ui/core';
import useStyles from './product-info-container.styles';

import Editor from '../../components/editor';
import TabPanel from '../../components/tab-panel';
import { config } from '../../configs';
import { productsTranslations } from '../../translations/product.translations';

const {
  product: { infoLabels },
  STRAP_LENGTH_IN_CM,
  languages
} = config;

const { CORRECT_DATA_ERROR } = productsTranslations;

const ProductInfoContainer = ({
  variant,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  toggleFieldsChanged,
  setFieldValue
}) => {
  const styles = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const handleTabsChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const languageTabs = languages.map((lang) => {
    const errorsKeys = Object.keys(errors);
    const tabErrors = infoLabels.filter(({ name }) =>
      errorsKeys.includes(`${lang}-${name}`)
    );

    return (
      <Tab
        className={tabErrors.length ? styles.errorTab : ''}
        label={lang}
        key={lang}
      />
    );
  });

  const handleInfoChange = (e) => {
    handleChange(e);
    toggleFieldsChanged(true);
  };

  const handleDescriptionChange = (value, lang) => {
    setFieldValue(`${lang}-description`, value);
    toggleFieldsChanged(true);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Paper className={styles.paper}>
        <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
          {languageTabs}
        </Tabs>
      </Paper>
      {languages.map((lang, idx) => (
        <TabPanel index={idx} value={tabValue} key={`${lang}-tab`}>
          {infoLabels.map(({ label, name, required }) =>
            name === 'description' ? (
              <Box key={label} ml={1} my={2} className={styles.editor}>
                <Editor
                  name={`${lang}-${name}`}
                  value={values[`${lang}-${name}`]}
                  onEditorChange={(value) =>
                    handleDescriptionChange(value, lang)
                  }
                  placeholder={label}
                />
              </Box>
            ) : (
              <TextField
                key={name}
                name={name === STRAP_LENGTH_IN_CM ? name : `${lang}-${name}`}
                className={styles.textfield}
                id={name}
                label={`${label}${required ? '*' : ''}`}
                error={
                  touched[`${lang}-${name}`] && !!errors[`${lang}-${name}`]
                }
                helperText={
                  touched[`${lang}-${name}`] && errors[`${lang}-${name}`]
                }
                value={
                  name === STRAP_LENGTH_IN_CM
                    ? values[name]
                    : values[`${lang}-${name}`]
                }
                onChange={handleInfoChange}
                onBlur={handleBlur}
                variant={variant}
                inputProps={name === STRAP_LENGTH_IN_CM ? { min: 0 } : {}}
                type={name === STRAP_LENGTH_IN_CM ? 'number' : 'string'}
              />
            )
          )}
        </TabPanel>
      ))}
      <div className={styles.error}>
        {!!Object.keys(errors).length && CORRECT_DATA_ERROR}
      </div>
    </form>
  );
};

ProductInfoContainer.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  variant: PropTypes.string,
  toggleFieldsChanged: PropTypes.func
};

ProductInfoContainer.defaultProps = {
  toggleFieldsChanged: () => {},
  variant: 'standard'
};

export default ProductInfoContainer;
