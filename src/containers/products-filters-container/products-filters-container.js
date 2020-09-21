import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  Input
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Badge from '@material-ui/core/Badge';
import { useStyles } from './products-filters-container.styles';
import { productsTranslations } from '../../translations/product.translations';

const badgePosition = {
  vertical: 'top',
  horizontal: 'left'
};

const { CATEGORIES } = productsTranslations;

const ProductsFiltersContainer = ({
  buttonName,
  labels,
  productFilter,
  list,
  filterHandler
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
          checked={!!productFilter.find((filter) => filter === condition)}
        />
        <ListItemText primary={labels.length ? labels[idx] : item} />
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
    <div className={styles.container}>
      <Badge
        badgeContent={productFilter.length}
        color='error'
        anchorOrigin={badgePosition}
      >
        <FormControl className={styles.formControl}>
          <InputLabel id='mutiple-checkbox-label'>{buttonName}</InputLabel>
          <Select
            labelId='mutiple-checkbox-label'
            id='mutiple-checkbox'
            multiple
            value={productFilter}
            onChange={filterHandler}
            input={<Input />}
            renderValue={renderFilters}
          >
            {formGroupOptions}
          </Select>
        </FormControl>
      </Badge>
    </div>
  );
};

ProductsFiltersContainer.propTypes = {
  buttonName: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
  productFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  filterHandler: PropTypes.func.isRequired
};

ProductsFiltersContainer.defaultProps = {
  labels: []
};

export default ProductsFiltersContainer;
