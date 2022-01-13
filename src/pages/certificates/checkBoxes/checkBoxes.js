import React from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Checkbox, Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { useStyles } from './checkboxes.styles';

export const CheckBoxes = ({ options, handler }) => {
  const styles = useStyles();

  const updateCheckBoxCheck = (index) => (e) => {
    const newArr = [...options];
    newArr[index].checked = e.target.checked;
    handler(newArr);
  };

  const incrementQuantity = (index) => {
    const newArr = [...options];
    newArr[index].quantity += 1;
    handler(newArr);
  };

  const decrementQuantity = (index) => {
    const newArr = [...options];
    newArr[index].quantity -= 1;
    handler(newArr);
  };

  return (
    <Grid container spacing={5}>
      {options.map((checkbox, index) => (
        <Grid item xs={4} key={checkbox.name} className={styles.gridItem}>
          <div className={styles.item}>
            <Checkbox
              className={styles.checkbox}
              checked={checkbox.checked}
              name={checkbox.name}
              onChange={updateCheckBoxCheck(index)}
            />
            <label className={styles.label} htmlFor={checkbox.name}>
              {checkbox.name}
            </label>
          </div>
          {checkbox.checked && (
            <div className={styles.quantity}>
              <Button
                data-testid='decrement'
                onClick={() => decrementQuantity(index)}
                disabled={checkbox.quantity <= 1}
              >
                <RemoveIcon />
              </Button>
              <h5 className={styles.H5} data-testid='quantity'>
                {checkbox.quantity}
              </h5>
              <Button
                onClick={() => incrementQuantity(index)}
                data-testid='increment'
              >
                <AddIcon />
              </Button>
            </div>
          )}
        </Grid>
      ))}
    </Grid>
  );
};
const checkBoxInterface = PropTypes.shape({
  checked: PropTypes.bool,
  name: PropTypes.string,
  quantity: PropTypes.number
});

CheckBoxes.propTypes = {
  options: PropTypes.arrayOf(checkBoxInterface),
  handler: PropTypes.func
};

CheckBoxes.defaultProps = {
  options: [],
  handler: noop
};
