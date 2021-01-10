import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  Paper,
  Card,
  CardContent,
  Divider,
  Box
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from '../../../../components/tab-panel';
import { config } from '../../../../configs';
import { useStyles } from './product-add-submit.styles';
import Detail from '../../../../components/detail';
import StepperButtons from '../../../../components/buttons/stepper-control-buttons';
import { addProduct } from '../../../../redux/products/products.actions';

const {
  labels: {
    product: { infoLabels, selectsLabels, optionsLabels, priceLabel }
  },
  languages
} = config;

const ProductAddSubmit = ({
  selectedOptions,
  additions,
  activeStep,
  handleBack,
  getSelectedCategory
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { productToSend, categories, modelsForSelectedCategory } = useSelector(
    ({ Products }) => ({
      productToSend: Products.productToSend,
      categories: Products.productSpecies.categories,
      modelsForSelectedCategory:
        Products.productSpecies.modelsForSelectedCategory
    })
  );

  const {
    model,
    colors,
    pattern,
    basePrice,
    category,
    subcategory
  } = productToSend;

  const [tabValue, setTabValue] = useState(0);

  const handleTabsChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleAddProduct = () => {
    dispatch(addProduct());
  };

  const selectedCategory = useMemo(() => getSelectedCategory(category), [
    category,
    getSelectedCategory
  ]);

  const selectedSubCategory = useMemo(
    () => categories.find(({ _id }) => _id === subcategory),
    [subcategory, categories]
  );

  const selectedModel = useMemo(
    () => modelsForSelectedCategory.find(({ _id }) => _id === model),
    [model, modelsForSelectedCategory]
  );

  const speciesNames = {
    category: selectedCategory ? selectedCategory.name[0].value : '',
    subcategory: selectedSubCategory ? selectedSubCategory.name[0].value : '',
    model: selectedModel ? selectedModel.name[0].value : '',
    colors: colors.length ? colors[0].simpleName[0].value : '',
    pattern: pattern.length ? pattern[0].value : ''
  };

  const species = selectsLabels.map(({ name, label }) => (
    <Detail key={name} title={label} text={speciesNames[name]} />
  ));

  const tabPanels = languages.map((lang, idx) => (
    <TabPanel index={idx} value={tabValue} key={lang}>
      {infoLabels.map(({ label, name }) => {
        const text = productToSend[name].length
          ? productToSend[name].find((product) => product.lang === lang).value
          : productToSend[name];

        return text ? <Detail key={name} title={label} text={text} /> : null;
      })}
    </TabPanel>
  ));

  const languageTabs = languages.map((lang) => (
    <Tab label={lang} key={`${lang}`} />
  ));

  return (
    <div>
      <Card>
        <Paper>
          <Tabs onChange={handleTabsChange} value={tabValue} aria-label='tabs'>
            {languageTabs}
          </Tabs>
        </Paper>
        <CardContent>
          {tabPanels}
          <Divider />
          <div className={styles.cardContent}>
            {species}
            {<Detail title={priceLabel.label} text={basePrice} />}
            {!!selectedOptions.sizes.length && (
              <Detail
                title={optionsLabels[0].label}
                text={selectedOptions.sizes.sort().reverse().join(', ')}
              />
            )}
            {!!selectedOptions.bottomMaterials.length && (
              <Detail
                title={optionsLabels[1].label}
                text={selectedOptions.bottomMaterials.join(', ')}
              />
            )}
            {!!selectedOptions.additions && (
              <Detail title={additions[0].name[0].value} text='так' />
            )}
          </div>
        </CardContent>
      </Card>
      <Box mt={2}>
        <StepperButtons
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleAddProduct}
        />
      </Box>
    </div>
  );
};

ProductAddSubmit.propTypes = {
  selectedOptions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
  ).isRequired,
  getSelectedCategory: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  additions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.arrayOf(
        PropTypes.shape({
          lang: PropTypes.string,
          value: PropTypes.string
        })
      ),
      additionalPrice: PropTypes.arrayOf(
        PropTypes.shape({
          currency: PropTypes.string,
          value: PropTypes.number
        })
      )
    })
  )
};

ProductAddSubmit.defaultProps = {
  additions: []
};

export default ProductAddSubmit;
