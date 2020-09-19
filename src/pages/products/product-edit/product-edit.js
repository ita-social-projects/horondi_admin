import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getProduct,
    getProductOptions,
    getProductSpecies, setProduct
} from "../../../redux/products/products.actions";
import ProductEditForm from "./product-edit-form";
import LoadingBar from "../../../components/loading-bar";
import {productModel} from "../../../redux/products/products.reducer";

const ProductEdit = ({ match }) => {
    const { id } = match.params
    const dispatch = useDispatch()
    const { product, loading } = useSelector(({ Products }) => ({
        product: Products.product,
        loading: Products.loading
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getProductSpecies());
        dispatch(getProductOptions());
        dispatch(getProduct(id))

        return () => {
            dispatch(setProduct(productModel))
        }
    }, [id, dispatch])

    if(loading) {
        return <LoadingBar />
    }

    return (
        <div>
            {product.name[0].value ? <ProductEditForm /> : <LoadingBar />}
        </div>
    );
};

export default ProductEdit;