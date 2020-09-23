import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Box
} from '@material-ui/core';
import useStyles from './product-info-container.styles';

import Editor from "../../components/editor";
import TabPanel from '../../components/tab-panel';
import { config } from '../../configs';
import {productsTranslations} from "../../translations/product.translations";

const { SELECT_LANGUAGES } = productsTranslations
const { infoLabels } = config.product;

const ProductInfoContainer = ({
  preferedLanguages,
  setPreferedLanguages,
  checkedLanguages,
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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferedLanguages({
      ...preferedLanguages,
      [name]: { name, checked }
    });
    toggleFieldsChanged(true);
    if(!checked) {
      infoLabels.forEach(label => setFieldValue(`${name}${label.name}`, ''))
    }
  };

  const handleTabsChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const langCheckboxes = Object.values(
    preferedLanguages
  ).map(({ name, checked }, idx) => (
    <FormControlLabel
      key={idx}
      control={
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
          name={name}
          color='primary'
        />
      }
      label={name}
    />
  ));

  const languageTabs = checkedLanguages.map(({ name }, idx) => (
    <Tab label={name} key={idx} />
  ));

  const handleInfoChange = (e) => {
    handleChange(e);
    toggleFieldsChanged(true);
  };

  const handleDescriptionChange = (value, lang) => {
    setFieldValue(`${lang}description`, value)
    toggleFieldsChanged(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems='center' spacing={2}>
        <Grid item>
          <Typography className={styles.title}>{SELECT_LANGUAGES}</Typography>
        </Grid>
        <Grid item>{langCheckboxes}</Grid>
      </Grid>
      {languageTabs.length ? (
        <Paper className={styles.paper}>
          <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
            {languageTabs}
          </Tabs>
        </Paper>
      ) : null}
      {checkedLanguages.map((lang, idx) => (
        <TabPanel index={idx} value={tabValue} key={idx}>
          {infoLabels.map(({ label, name, required }) => (
            name === 'description'
              ? <Box key={name} ml={1} my={2} className={styles.editor}>
                  <Editor
                      name={`${lang.name}${name}`}
                      value={values[`${lang.name}${name}`]}
                      onEditorChange={(value) => handleDescriptionChange(value, lang.name)}
                      placeholder={label}
                  />
                </Box>
              : <TextField
                key={name}
                name={`${lang.name}${name}`}
                className={styles.textfield}
                id={name}
                label={`${label}${required ? '*' : ''}`}
                error={
                  touched[`${lang.name}${name}`] &&
                  !!errors[`${lang.name}${name}`]
                }
                helperText={
                  touched[`${lang.name}${name}`] && errors[`${lang.name}${name}`]
                }
                value={values[`${lang.name}${name}`]}
                onChange={handleInfoChange}
                onBlur={handleBlur}
                variant={variant}
              />
            ))}
        </TabPanel>
      ))}
    </form>
  );
};

ProductInfoContainer.propTypes = {
  setPreferedLanguages: PropTypes.func.isRequired,
  checkedLanguages: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  preferedLanguages: PropTypes.objectOf(PropTypes.object),
  setFieldValue: PropTypes.func.isRequired,
  variant: PropTypes.string,
  toggleFieldsChanged: PropTypes.func,
};

ProductInfoContainer.defaultProps = {
  preferedLanguages: {},
  toggleFieldsChanged: () => {},
  variant: 'standard'
};

export default ProductInfoContainer;
