import React from 'react';

import { Grid } from '@material-ui/core';

import { useStyles } from './Product-image-container-style';

const ProductImageContainer = ({ imageURL }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <img
          className={classes.img}
          src={imageURL}
          width='100%'
          alt='here is'
        />
      </Grid>
      <Grid item xs={4}>
        <img
          className={classes.img}
          src={imageURL}
          width='100%'
          alt='here is'
        />
      </Grid>
      <Grid item xs={4}>
        <img
          className={classes.img}
          src={imageURL}
          width='100%'
          alt='here is'
        />
      </Grid>
      <Grid item xs={4}>
        <img
          className={classes.img}
          src={imageURL}
          width='100%'
          alt='here is'
        />
      </Grid>
    </Grid>
  );
};

export default ProductImageContainer;
