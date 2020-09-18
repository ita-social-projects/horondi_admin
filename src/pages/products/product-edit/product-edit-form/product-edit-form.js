import React, {useEffect} from 'react';
import {Paper, Grid, Button, Typography, Box, Divider} from '@material-ui/core';
import { useStyles } from "./product-edit-form.styles";
import useProductHandler from "../../../../utils/use-product-handler";
import ProductInfoContainer from "../../../../components/product-info-container/product-info-container";
import {useDispatch, useSelector} from "react-redux";
import {getModelsByCategory, setProductToSend} from "../../../../redux/products/products.actions";
import useProductValidation from "../../../../utils/use-product-validation";
import ProductSpeciesContainer from "../../../../components/product-species-container";
import Carousel from 'react-multi-carousel'
import {config} from "../../../../configs";
import 'react-multi-carousel/lib/styles.css';
import './product-edit-form.css';
import LoadingBar from "../../../../components/loading-bar";
import ProductOptionsContainer from "../../../../components/product-options-container";

const { responsive, IMG_URL } = config

const ProductEditForm = () => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const { productToSend, modelsForSelectedCategory, productOptions } = useSelector(({ Products }) => ({
        productToSend: Products.productToSend,
        modelsForSelectedCategory: Products.productSpecies.modelsForSelectedCategory,
        productOptions: Products.productOptions
    }))
    const { images } = productToSend

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

    const onSubmit = (values) => {
        const { colors, pattern, model } = values;
        const productInfo = createProductInfo(values);
        dispatch(setProductToSend({
            ...productInfo,
            ...values,
            options,
            colors: getColorToSend(colors),
            pattern: getPatternToSend(pattern),
            model: getModelToSend(model)._id
        }));
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
    } = useProductValidation(checkedLanguages, onSubmit, models)

    useEffect(() => {
        if (values.category) dispatch(getModelsByCategory(values.category));
    }, [values.category, dispatch]);

    const handleProductValidate = () => {
        setShouldValidate(true)
        submitForm().then(res => console.log(res)).catch(e => console.log(e))
    }

    const handleProductDelete = () => {
        console.log('deleted')
    }

    const imagesToMap = images ? [images.primary.large, ...images.additional.map(({ large }) => large)] : []

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