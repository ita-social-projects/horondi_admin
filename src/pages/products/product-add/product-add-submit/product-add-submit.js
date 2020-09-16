import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import {
    Tab,
    Tabs,
    AppBar,
    Card,
    CardContent,
    Divider,
    Box
} from '@material-ui/core';
import TabPanel from '../../../../components/tab-panel';
import {config} from '../../../../configs';
import {useStyles} from './product-add-submit.styles';
import {useDispatch, useSelector} from "react-redux";
import ProductAddDetail from "../product-add-detail";
import StepperButtons from "../product-add-stepper/stepper-buttons";
import {addProduct} from "../../../../redux/products/products.actions";

const {
    productInfoLabels,
    productSelectsLabels,
    productOptionsLabels
} = config;

const ProductAddSubmit = ({
  preferedLanguages,
  selectedOptions,
  additions,
  activeStep,
  handleBack,
  getSelectedCategory
}) => {
    const styles = useStyles();
    const dispatch = useDispatch()
    const {productToSend, categories, modelsForSelectedCategory} = useSelector(({Products}) => ({
        productToSend: Products.productToSend,
        categories:  Products.productSpecies.categories,
        modelsForSelectedCategory: Products.productSpecies.modelsForSelectedCategory,
    }))

    const { model, colors, pattern, basePrice, strapLengthInCm, category, subcategory } = productToSend

    const [tabValue, setTabValue] = useState(0);

    const handleTabsChange = (e, newValue) => {
        setTabValue(newValue);
    };

    const handleAddProduct = () => {
        dispatch(addProduct());
    }

    const checkedLanguages = useMemo(
        () => Object.values(preferedLanguages).filter(({checked}) => checked),
        [preferedLanguages]
    );

    const selectedCategory = useMemo(() => getSelectedCategory(category), [category, getSelectedCategory]);

    const selectedSubCategory = useMemo(
        () => categories.find(({ _id }) => _id === subcategory),
        [subcategory, categories]
    );

    const selectedModel = useMemo(
        () => modelsForSelectedCategory.find(({ _id }) => _id === model),
        [model, modelsForSelectedCategory]
    );

    const speciesNames = {
        category: selectedCategory.name[0].value,
        subcategory: selectedSubCategory.name[0].value,
        model: selectedModel.name[0].value,
        colors: colors[0].simpleName[0].value,
        pattern: pattern[0].value,
        basePrice,
        strapLengthInCm
    };

    const species = productSelectsLabels.map(({ name, label }) => (
        <ProductAddDetail key={name} title={label} text={speciesNames[name]}/>
    ))

    const tabPanels = checkedLanguages.map((checkedLang, idx) => (
        <TabPanel index={idx} value={tabValue} key={idx}>
            {productInfoLabels.map(({label, name}) => (
                <ProductAddDetail
                    key={name}
                    title={label}
                    text={
                        productToSend[name].find(({ lang }) => lang === checkedLang.name).value
                    }
                />
            ))}
        </TabPanel>
    ));

    const languageTabs = checkedLanguages.map(({name}, idx) => (
        <Tab label={name} key={idx}/>
    ));

    return (
        <div>
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
                    <Divider/>
                    <div className={styles.cardContent}>
                        {species}
                        {
                            selectedOptions.sizes.length
                            ? <ProductAddDetail
                                title={productOptionsLabels[0].label}
                                text={selectedOptions.sizes.sort().reverse().join(', ')}
                            />
                            : null
                        }
                        {
                            selectedOptions.bottomMaterials.length
                            ? <ProductAddDetail
                                    title={productOptionsLabels[1].label}
                                    text={selectedOptions.bottomMaterials.join(', ')}
                                />
                            : null
                        }
                        {selectedOptions.additions
                            ? <ProductAddDetail title={additions[0].name[0].value} text="так" />
                            : null
                        }
                    </div>
                </CardContent>
            </Card>
            <Box mt={2}>
                <StepperButtons activeStep={activeStep} handleBack={handleBack} handleNext={handleAddProduct}/>
            </Box>
        </div>
    );
};

ProductAddSubmit.propTypes = {
    preferedLanguages: PropTypes.objectOf(PropTypes.object).isRequired,
    selectedOptions: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.bool])).isRequired,
    values: PropTypes.objectOf(PropTypes.object),
    productSpecies: PropTypes.objectOf(PropTypes.object),
    productImages: PropTypes.objectOf(PropTypes.object),
    additions: PropTypes.arrayOf(PropTypes.object),
    selectedCategory: PropTypes.objectOf(PropTypes.object),
    selectedSubcategory: PropTypes.objectOf(PropTypes.object)
};

ProductAddSubmit.defaultProps = {
    selectedCategory: null,
    selectedSubcategory: null,
    additions: [],
    values: {},
    productSpecies: {},
    productImages: {}
};

export default ProductAddSubmit;
