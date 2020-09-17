import React, {useEffect, useState} from 'react';
import {Paper, Grid, Button, Typography, Box} from '@material-ui/core';
import { useStyles } from "./product-edit.styles";
import useProductHandler from "../../../utils/use-product-handler";
import ProductInfoContainer from "../../../components/product-info-container/product-info-container";
import {useDispatch} from "react-redux";
import {
    getProduct,
    getProductOptions,
    getProductSpecies,
    setProductToSend
} from "../../../redux/products/products.actions";
import useProductValidation from "../../../utils/use-product-validation";
import {useFormik} from "formik";
import * as Yup from 'yup'
import ProductSpeciesContainer from "../../../components/product-species-container";

const ProductEdit = ({ match }) => {
    const { id } = match.params
    const styles = useStyles()
    const dispatch = useDispatch()
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
        selectedOptions
    } = useProductHandler()

    const {
        formikInfoValues,
        yupInfoSchema,
        formikSpeciesValues,
        yupSpeciesSchema
    } = useProductValidation(checkedLanguages)

    const [shouldValidate, setShouldValidate] = useState(false)

    useEffect(() => {
        dispatch(getProductSpecies());
        dispatch(getProductOptions());
        dispatch(getProduct(id))
    }, [dispatch, id]);

    const yupSchema = Yup.object().shape({ ...yupInfoSchema, ...yupSpeciesSchema })
    const formikValues = { ...formikInfoValues, ...formikSpeciesValues }

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

    const handleProductValidate = () => {
        setShouldValidate(true)
    }

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched
    } = useFormik({
        initialValues: formikValues,
        validationSchema: yupSchema,
        onSubmit,
        validateOnBlur: shouldValidate,
        validateOnChange: shouldValidate
    });

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <Grid container justify='center' spacing={3} >
                <Grid item xs={12}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={handleProductValidate}>
                        Зберегти
                    </Button>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper className={styles.paper}>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Paper className={styles.paper}>
                        <ProductInfoContainer
                            preferedLanguages={preferedLanguages}
                            setPreferedLanguages={setPreferedLanguages}
                            checkedLanguages={checkedLanguages}
                            onSubmit={handleSubmit}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            shouldValidate={shouldValidate}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Paper className={styles.paper}>
                        <Box mb={1}>
                            <Typography>
                                Специфікація продукту:
                            </Typography>
                        </Box>
                        <ProductSpeciesContainer
                            models={models}
                            patterns={patterns}
                            colors={colors}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            getSelectedCategory={getSelectedCategory}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductEdit;