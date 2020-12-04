import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Paper, Tabs, Tab, Box } from '@material-ui/core';
import useStyles from './product-info-container.styles';

import Editor from '../../components/editor';
import TabPanel from '../../components/tab-panel';

import { config } from '../../configs';
import { productsTranslations } from '../../translations/product.translations';

const {
  labels: {
    product: { infoLabels }
  },
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
    setFieldValue(`${lang}-${infoLabels[5].name}`, value);
    toggleFieldsChanged(true);
  };

  const inputsList = languages.map((lang, idx) => (
    <TabPanel index={idx} value={tabValue} key={`${lang}`}>
      {infoLabels.map(({ label, name, required }) => {
        const inputLangName = `${lang}-${name}`;
        const inputError = touched[inputLangName] && errors[inputLangName];
        const isStrapLengthInput = Boolean(name === infoLabels[4].name);

        return name === infoLabels[5].name ? (
          <Box key={label} ml={1} my={2} className={styles.editor}>
            <Editor
              name={inputLangName}
              value={values[inputLangName]}
              onEditorChange={(value) => handleDescriptionChange(value, lang)}
              placeholder={label}
            />
          </Box>
        ) : (
          <TextField
            id={name}
            key={name}
            className={styles.textField}
            variant={variant}
            type={isStrapLengthInput ? 'number' : 'string'}
            name={isStrapLengthInput ? name : inputLangName}
            inputProps={isStrapLengthInput ? { min: 0 } : {}}
            value={isStrapLengthInput ? values[name] : values[inputLangName]}
            onChange={handleInfoChange}
            onBlur={handleBlur}
            label={`${label}${required ? '*' : ''}`}
            error={!!inputError}
            helperText={inputError}
          />
        );
      })}
    </TabPanel>
  ));

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Paper className={styles.paper}>
        <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
          {languageTabs}
        </Tabs>
      </Paper>
      {inputsList}
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
