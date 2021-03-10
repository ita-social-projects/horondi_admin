import React from 'react';
import { map } from 'lodash';
import { MenuItem } from '@material-ui/core';

export const handleMenuItem = (materials) => map(materials, (item) => (
  <MenuItem value={item._id} key={item.name[1].value}>
    {item.name[0].value}
  </MenuItem>
));
