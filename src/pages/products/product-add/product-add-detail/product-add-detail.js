import React from 'react'
import {Typography} from "@material-ui/core";
import {useStyles} from "./product-add-detail.styles";

const ProductAddDetail = ({ title, text }) => {
    const styles = useStyles()

    return (
        <div>
            <Typography>
                <span className={styles.title}>{title}: </span>
                {text}
            </Typography>
        </div>
    )
}

export default ProductAddDetail