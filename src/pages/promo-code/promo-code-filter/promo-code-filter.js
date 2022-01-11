import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

import { useStyles } from './promo-code-filter.styles';
import NavSearch from '../../../components/filter-search-sort/nav-search';
import { productsTranslations } from '../../../configs/product-translations';

const PromoCodeFilter = () => {
  const styles = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [search, setSearchFilter] = useState('');
  const searchOptions = {
    search,
    setSearchFilter,
    placeholder: 'qweqeqw'
  };
  return (
    <div className={styles.container}>
      <FormControl className={styles.checkbox}>
        <InputLabel>Вартість</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={age}
          label='Вартість'
          onChange={handleChange}
        >
          <MenuItem value={10}>від менших до більших</MenuItem>
          <MenuItem value={20}>від більших до менших</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={styles.checkbox}>
        <InputLabel id='demo-simple-select-helper-label'>Статус</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={age}
          label='Вартість'
          onChange={handleChange}
        >
          <MenuItem value={10}>від менших до більших</MenuItem>
          <MenuItem value={20}>від більших до менших</MenuItem>
        </Select>
      </FormControl>
      <Grid item>
        <NavSearch searchOptions={searchOptions} />
      </Grid>
      <Button data-cy='add-product' variant='outlined' color='primary'>
        {productsTranslations.CLEAN.toUpperCase()}
      </Button>
    </div>
  );
};

export default PromoCodeFilter;
