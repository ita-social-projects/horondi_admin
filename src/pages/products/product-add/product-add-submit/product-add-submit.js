import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  AppBar,
  Card,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core';
import TabPanel from '../../../../components/tab-panel';
import { config } from '../../../../configs';
import { useStyles } from './product-add-submit.styles';

const {
  productInfoLabels,
  productSelectsLabels,
  productOptionsLabels,
  productImagesLabels
} = config;

const ProductAddSubmit = ({
  preferedLanguages,
  values,
  productSpecies,
  productImages,
  selectedCategory,
  selectedSubcategory,
  selectedOptions,
  additions
}) => {
  const styles = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const checkedLanguages = useMemo(
    () => Object.values(preferedLanguages).filter(({ checked }) => checked),
    [preferedLanguages]
  );

  const handleTabsChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const speciesNames = {
    ...productSpecies,
    category: selectedCategory ? selectedCategory.name[0].value : '',
    subcategory: selectedSubcategory ? selectedSubcategory.name[0].value : ''
  };

  const getHeaders = (labels, names, join = false) =>
    labels.map(({ name, label }) => (
      <Typography key={name}>
        {label}: {join ? names[name].sort().reverse().join(', ') : names[name]}
      </Typography>
    ));

  const species = useMemo(
    () => getHeaders(productSelectsLabels, speciesNames),
    [speciesNames]
  );

  const options = useMemo(
    () => getHeaders(productOptionsLabels, selectedOptions, true),
    [selectedOptions]
  );

  const images = useMemo(() => getHeaders(productImagesLabels, productImages), [
    productImages
  ]);

  const tabPanels = checkedLanguages.map((_, idx) => (
    <TabPanel index={idx} value={tabValue} key={idx}>
      {productInfoLabels[idx].map(({ label, name }) => (
        <Typography key={name}>
          {label}: {values[name]}
        </Typography>
      ))}
    </TabPanel>
  ));

  const languageTabs = checkedLanguages.map(({ name }, idx) => (
    <Tab label={name} key={idx} />
  ));

  return (
    <Card>
      {languageTabs.length ? (
        <AppBar position='static'>
          <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
            {languageTabs}
          </Tabs>
        </AppBar>
      ) : null}
      <CardContent>
        {tabPanels}
        <Divider />
        <div className={styles.cardContent}>
          {species}
          {options}
          <Typography>
            {`${additions[0].name[0].value}: ${
              selectedOptions.additions ? 'так' : ''
            }`}
          </Typography>
          {images}
        </div>
      </CardContent>
    </Card>
  );
};

ProductAddSubmit.propTypes = {
  preferedLanguages: PropTypes.objectOf(PropTypes.object).isRequired,
  values: PropTypes.objectOf(PropTypes.object).isRequired,
  productSpecies: PropTypes.objectOf(PropTypes.object).isRequired,
  productImages: PropTypes.objectOf(PropTypes.object).isRequired,
  selectedOptions: PropTypes.objectOf(PropTypes.object).isRequired,
  additions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategory: PropTypes.objectOf(PropTypes.object),
  selectedSubcategory: PropTypes.objectOf(PropTypes.object)
};

ProductAddSubmit.defaultProps = {
  selectedCategory: null,
  selectedSubcategory: null
};

export default ProductAddSubmit;
