import React from 'react';
import { push } from 'connected-react-router';
import { Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import ProductsNavFilters from './products-nav-filters';

import { productsTranslations } from '../../../translations/product.translations';
import routes from '../../../configs/routes';
import { useStyles } from './products-nav.styles';
import { config } from '../../../configs';
import { useCommonStyles } from '../../common.styles';

const { ADD_PRODUCT } = productsTranslations;
const { filters } = config.titles.productTitles;
const ProductsNav = () => {
  const common = useCommonStyles();
  const styles = useStyles();
  const dispatch = useDispatch();
  const handleProductAdd = () => {
    dispatch(push(routes.pathToAddProduct));
  };

  return (
    <Grid
      container
      direction='column'
      justify='center'
      spacing={2}
      className={styles.wrapper}
    >
      <div className={common.adminHeader}>
        <Typography variant='h1' className={common.materialTitle}>
          {config.titles.productPageTitles.mainPageTitle}
        </Typography>
        <Button variant='contained' color='primary' onClick={handleProductAdd}>
          {ADD_PRODUCT}
        </Button>
      </div>
      <Grid container item spacing={2} className={styles.filters}>
        <Accordion className={styles.filtersMenu}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={styles.heading}>{filters}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles.filtersMenu}>
              <ProductsNavFilters />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default ProductsNav;
