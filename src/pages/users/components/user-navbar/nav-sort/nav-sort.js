import React, { useState } from 'react';
import { FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import useUsersFiltering from '../../../../../hooks/user/use-users-filtering';
import { useStyles } from './nav-sort.styles';
import { config } from '../../../../../configs';
import { userLabelsTranslations } from '../../../../../translations/user.translations';

const NavSort = () => {
  const sortOptions = config.sort.users;
  const [sortValue, setSortValue] = useState(sortOptions[0].value);
  const styles = useStyles();
  const { setSorting } = useUsersFiltering();

  const selectOptions = sortOptions.map(({ label, value }) => (
    <MenuItem key={label} value={value}>
      {label}
    </MenuItem>
  ));

  const selectHandler = (e) => {
    const { value } = e.target;
    const result = sortOptions.find((item) => item.value === value);

    if (result) {
      setSortValue(result.value);
      setSorting(result.key, result.type);
    }
  };

  return (
    <div className={styles.sort}>
      <Typography>{userLabelsTranslations.sort}</Typography>
      <FormControl className={styles.formControl}>
        <Select
          data-cy='user-sorting'
          labelId='checkbox-label'
          id='checkbox'
          value={sortValue}
          onChange={selectHandler}
          defaultValue={0}
        >
          {selectOptions}
        </Select>
      </FormControl>
    </div>
  );
};

export default NavSort;
