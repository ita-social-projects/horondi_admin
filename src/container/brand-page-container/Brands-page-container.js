import React from 'react';
import { useStyles } from './Brands-page-container-styles';
import BrandList from '../../components/brand-list';

const BrandsPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <BrandList />
    </div>
  );
};

export default BrandsPageContainer;
