import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  Badge
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './products-filters-container.styles';

import { productsTranslations } from '../../translations/product.translations';
import { config } from '../../configs';

const badgePosition = {
  vertical: 'top',
  horizontal: 'right'
};

const MenuProps = {
  variant: 'menu',
  PaperProps: {
    style: {
      maxHeight: 300
    }
  }
};
const { CATEGORIES } = productsTranslations;
const { deleteFilter } = config.titles.productTitles;
const ProductsFiltersContainer = ({
  buttonName,
  labels,
  productFilter,
  list,
  filterHandler,
  clearFilter
}) => {
  const styles = useStyles();
  const { filters } = useSelector(({ Products }) => ({
    filters: Products.filters
  }));
  const { categoryFilter } = filters;

  const formGroupOptions = list.map((item, idx) => {
    const condition = item._id || item;
    return (
      <MenuItem key={condition} value={condition}>
        <Checkbox
          size='small'
          checked={!!productFilter.find((filter) => filter === condition)}
        />
        <ListItemText
          primary={labels.length ? labels[idx] : item}
          className={styles.menuItems}
        />
      </MenuItem>
    );
  });

  const renderFilters = useMemo(
    () => (selected) =>
      buttonName === CATEGORIES
        ? list
            .filter(({ _id }) =>
              categoryFilter.some((category) => category === _id)
            )
            .map(({ name }) => name[0].value)
            .join(', ')
        : selected.join(', '),
    [categoryFilter, list, buttonName]
  );

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={3}
      container
      alignItems='center'
      className={styles.container}
    >
      <Badge
        badgeContent={productFilter.length}
        color='error'
        anchorOrigin={badgePosition}
        className={styles.badge}
      >
        {productFilter.length ? (
          <Tooltip title={deleteFilter}>
            <RemoveCircleOutlineIcon
              onClick={clearFilter}
              color='error'
              className={styles.filterIcon}
            />
          </Tooltip>
        ) : null}
        <FormControl className={styles.formControl}>
          <InputLabel id='multiple-checkbox-label'>{buttonName}</InputLabel>
          <Select
            labelId='multiple-checkbox-label'
            id='multiple-checkbox'
            multiple
            MenuProps={MenuProps}
            value={productFilter}
            onChange={filterHandler}
            input={<Input />}
            renderValue={renderFilters}
            className={styles.menuItems}
          >
            {formGroupOptions}
          </Select>
        </FormControl>
      </Badge>
    </Grid>
  );
};

ProductsFiltersContainer.propTypes = {
  buttonName: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
  productFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  filterHandler: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired
};

ProductsFiltersContainer.defaultProps = {
  labels: []
};

export default ProductsFiltersContainer;
