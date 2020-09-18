import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    clearProductToSend,
    getProduct,
    getProductOptions,
    getProductSpecies
} from "../../../redux/products/products.actions";
import ProductEditForm from "./product-edit-form";
import LoadingBar from "../../../components/loading-bar";

const ProductEdit = ({ match }) => {
    const { id } = match.params
    const dispatch = useDispatch()
    const { productToSend, loading } = useSelector(({ Products }) => ({
        productToSend: Products.productToSend,
        loading: Products.loading
    }))

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getProductSpecies());
        dispatch(getProductOptions());
        dispatch(getProduct(id))

        return () => {
            dispatch(clearProductToSend())
        }
    }, [id, dispatch])

    if(loading) {
        return <LoadingBar />
    }

    return (
        <div>
            {productToSend.name[0].value ? <ProductEditForm /> : <LoadingBar />}
        </div>
    );
};

export default ProductEdit;