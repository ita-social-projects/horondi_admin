import React, {useEffect, useMemo} from 'react';
import {Paper, Grid, Button, Typography, Box, Divider} from '@material-ui/core';
import { useStyles } from "./product-edit-form.styles";
import useProductHandler from "../../../../utils/use-product-handler";
import ProductInfoContainer from "../../../../components/product-info-container/product-info-container";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getModelsByCategory, updateProduct} from "../../../../redux/products/products.actions";
import useProductValidation from "../../../../utils/use-product-validation";
import ProductSpeciesContainer from "../../../../components/product-species-container";
import Carousel from 'react-multi-carousel'
import {config} from "../../../../configs";
import 'react-multi-carousel/lib/styles.css';
import './product-edit-form.css';
import LoadingBar from "../../../../components/loading-bar";
import ProductOptionsContainer from "../../../../components/product-options-container";
import {closeDialog} from "../../../../redux/dialog-window/dialog-window.actions";
import useSuccessSnackbar from "../../../../utils/use-success-snackbar";
import {productsTranslations} from "../../../../translations/product.translations";

const { responsive, IMG_URL } = config
const {
    DELETE_PRODUCT_MESSAGE,
    DELETE_PRODUCT_TITLE,
    DELETE_PRODUCT_BTN
} = productsTranslations;

const ProductEditForm = () => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const { product, modelsForSelectedCategory } = useSelector(({ Products }) => ({
        product: Products.product,
        modelsForSelectedCategory: Products.productSpecies.modelsForSelectedCategory
    }))

    const formikSpeciesValues = {
        category: product.category._id,
        subcategory: product.subcategory._id,
        model: product.model[0].value,
        pattern: product.pattern[0].value,
        colors:  product.colors[0].simpleName[0].value,
        basePrice: Math.round(product.basePrice[1].value / 100),
        strapLengthInCm: product.strapLengthInCm
    }

    const { openSuccessSnackbar } = useSuccessSnackbar();

    const {
        checkedLanguages,
        preferedLanguages,
        setPreferedLanguages,
        createProductInfo,
        getColorToSend,
        getPatternToSend,
        getModelToSend,
        colors,
        patterns,
        models,
        options,
        getSelectedCategory,
        setOptions,
        selectedOptions,
        additions
    } = useProductHandler()

    const uniqueSizes = useMemo(
        () => [
            ...new Set(
                product.options.filter(({ size }) => !!size).map(({ size: { name } }) => name)
            )
        ],
        [product.options]
    );

    const uniqueBottomMaterials = useMemo(
        () => [
            ...new Set(
                product.options
                    .filter(({ bottomMaterial: item }) =>  item && item.available)
                    .map(({ bottomMaterial: item }) => item.name[0].value)
            )
        ],
        [product.options]
    );

    const uniqueAdditions = useMemo(
        () => [
            ...new Set(
                product.options
                .filter(({ additions }) => additions.length > 0)
                .map(
                    ({ additions: [{ available, name }] }) =>
                        available && name[0].value
                )
            )
        ],
        [product.options]
    );

    useEffect(() => {
        setPreferedLanguages({
            uk: {
                name: 'uk',
                checked: !!product.name[0].value
            },
            en: {
                name: 'en',
                checked: !!product.name[1].value
            }
        })
    }, [product.name, setPreferedLanguages])

    useEffect(() => {
        if(product.options.length) {
            setOptions({
                sizes: uniqueSizes,
                bottomMaterials: uniqueBottomMaterials,
                additions: !!uniqueAdditions.length
            })
        }
    }, [product.options, setOptions, uniqueBottomMaterials, uniqueAdditions.length, uniqueSizes])

    const onSubmit = (values) => {
        const { colors, pattern, model, category, subcategory, basePrice, strapLengthInCm } = values;
        const productInfo = createProductInfo(values);
        dispatch(updateProduct({
            product: {
                ...productInfo,
                colors: getColorToSend(colors),
                pattern: getPatternToSend(pattern),
                model: getModelToSend(model),
                options,
                category,
                subcategory,
                basePrice,
                strapLengthInCm
            },
            id: product._id
        }));
        setShouldValidate(false)
    }

    const {
        shouldValidate,
        setShouldValidate,
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        submitForm,
        setFieldValue
    } = useProductValidation(checkedLanguages, onSubmit, formikSpeciesValues, 'product')

    useEffect(() => {
        if (values.category) dispatch(getModelsByCategory(values.category));
    }, [values.category, dispatch]);

    const handleProductValidate = async () => {
        setShouldValidate(true)
        await submitForm()
    }

    const handleProductDelete = () => {
        const removeProduct = () => {
            dispatch(closeDialog());
            dispatch(deleteProduct({ id: product._id }));
        };
        openSuccessSnackbar(
            removeProduct,
            DELETE_PRODUCT_TITLE,
            DELETE_PRODUCT_MESSAGE,
            DELETE_PRODUCT_BTN
        );
    }

    const imagesToMap = product.images ? [product.images.primary.large, ...product.images.additional.map(({ large }) => large)] : []

    const imagesForCarousel = imagesToMap.map(image => (
        <div
            key={image}
            className={styles.image}
            style={{
                background: `url(${IMG_URL}${image}) no-repeat center`,
                backgroundSize: 'cover'
            }}
        />
    ))

    return (
        <div className={styles.container}>
            {
                modelsForSelectedCategory.length ?
                <Grid container justify='center' spacing={3} >
                    <Grid item xs={12} container spacing={2}>
                        <Grid item>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                onClick={handleProductValidate}>
                                Зберегти
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type='button'
                                variant='outlined'
                                onClick={handleProductDelete}
                            >
                                Видалити продукт
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} xl={3}>
                        <Paper className={styles.paper}>
                            <Carousel
                                className={styles.carousel}
                                responsive={responsive}
                                swipeable={false}
                            >
                                {imagesForCarousel}
                            </Carousel>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7} xl={9}>
                        <Paper className={styles.paper}>
                            <ProductInfoContainer
                                preferedLanguages={preferedLanguages}
                                setPreferedLanguages={setPreferedLanguages}
                                checkedLanguages={checkedLanguages}
                                shouldValidate={shouldValidate}
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleSubmit={handleSubmit}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper className={styles.paper}>
                            <Box mb={1}>
                                <Typography className={styles.title}>
                                    Специфікація продукту:
                                </Typography>
                            </Box>
                            <ProductSpeciesContainer
                                models={models}
                                patterns={patterns}
                                colors={colors}
                                getSelectedCategory={getSelectedCategory}
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                handleSubmit={handleSubmit}
                                setFieldValue={setFieldValue}
                            />
                            <Box mt={3}>
                                <Divider />
                            </Box>
                            <Box mt={3}>
                                <Typography className={styles.title}>
                                    Опційні параметри продукту:
                                </Typography>
                            </Box>
                            <ProductOptionsContainer
                                setOptions={setOptions}
                                selectedOptions={selectedOptions}
                                additions={additions}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                : <LoadingBar />
            }
        </div>
    );
};

export default ProductEditForm;