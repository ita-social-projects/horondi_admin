import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  FormControlLabel,
  Checkbox,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Grid
} from '@material-ui/core';
import { useStyles } from './product-add-info.styles';

import { config } from '../../../configs';
import TabPanel from '../../../components/tab-panel';

const { productInfoLabels } = config;

const ProductAddInfo = ({
  productInputs,
  onChangeHandler,
  preferedLanguages,
  setPreferedLanguages
}) => {
  const styles = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const checkedLanguages = useMemo(
    () => Object.values(preferedLanguages).filter(({ checked }) => checked),
    [preferedLanguages]
  );

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferedLanguages({
      ...preferedLanguages,
      [name]: { name, checked }
    });
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

  const tabPanels = checkedLanguages.map((_, idx) => (
    <TabPanel index={idx} value={tabValue} key={idx}>
      {productInfoLabels.map(({ label, name }) => (
        <TextField
          className={styles.textfield}
          required
          key={name}
          id={name}
          label={label}
          name={name}
          value={productInputs[name][idx].value}
          onChange={(e) => onChangeHandler(e, idx)}
          type='string'
          variant='outlined'
          inputProps={{ min: 0, maxLength: 150 }}
        />
      ))}
    </TabPanel>
  ));

  const languageTabs = checkedLanguages.map(({ name }, idx) => (
    <Tab label={name} key={idx} />
  ));

  return (
    <div>
      <Grid container alignItems='center' spacing={2}>
        <Grid item>
          <Typography>Оберіть мови:</Typography>
        </Grid>
        <Grid item>{langCheckboxes}</Grid>
      </Grid>
      {languageTabs.length ? (
        <AppBar position='static'>
          <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
            {languageTabs}
          </Tabs>
        </AppBar>
      ) : null}
      {tabPanels}
    </div>
  );
};

ProductAddInfo.propTypes = {
  productInputs: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  ).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  preferedLanguages: PropTypes.objectOf(PropTypes.object).isRequired,
  setPreferedLanguages: PropTypes.func.isRequired
};

export default ProductAddInfo;
