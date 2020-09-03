import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Button, FormGroup, Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Badge from '@material-ui/core/Badge';
import { useStyles } from './products-filters-container.styles';
import { setCurrentPage } from '../../redux/table/table.actions';

const menuAnchorPosition = {
  vertical: 'bottom',
  horizontal: 'center'
};

const menuTransformPosition = {
  vertical: 'top',
  horizontal: 'center'
};

const ProductsFilterContainer = ({
  buttonName,
  labels,
  productFilter,
  setFilter,
  list
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [menuStatus, setMenuStatus] = useState(null);

  const handleFilterChange = (event) => {
    if (!event.target.checked) {
      dispatch(
        setFilter(productFilter.filter((item) => item !== event.target.name))
      );
    } else {
      dispatch(setFilter([...new Set([...productFilter, event.target.name])]));
    }
    dispatch(setCurrentPage(0));
  };

  const formGroupOptions = list.map(({ _id }, idx) => {
    const name = _id || labels[idx];

    return (
      <MenuItem key={idx}>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={!!productFilter.find((filter) => filter === name)}
            />
          }
          label={labels[idx]}
          onChange={handleFilterChange}
        />
      </MenuItem>
    );
  });

  return (
    <div className={styles.container}>
      <Badge badgeContent={productFilter.length} color='error'>
        <Button
          className={styles.button}
          variant='contained'
          color='primary'
          onClick={(e) => setMenuStatus(e.currentTarget)}
        >
          {buttonName}
        </Button>
      </Badge>
      <Menu
        keepMounted
        anchorEl={menuStatus}
        getContentAnchorEl={null}
        anchorOrigin={menuAnchorPosition}
        transformOrigin={menuTransformPosition}
        open={Boolean(menuStatus)}
        onClose={() => setMenuStatus(null)}
      >
        <FormGroup>{formGroupOptions}</FormGroup>
      </Menu>
    </div>
  );
};

ProductsFilterContainer.propTypes = {
  buttonName: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  productFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProductsFilterContainer;
