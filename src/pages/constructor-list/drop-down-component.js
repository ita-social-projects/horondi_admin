import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectedEmpty: {
    margin: theme.spacing(2)
  }
}));

const DropDownModelList = () => {
  const styles = useStyles();
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl required className={styles.formControl}>
      <InputLabel shrink>Оберіть модель для конструктора</InputLabel>
      <Select
        // labelId='select-demo'
        // id='florida_select'
        // displayEmpty
        value={value}
        onChange={handleChange}
        // autoWidth
        className={styles.selectedEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value='' disabled>
          Модель
        </MenuItem>
        <MenuItem value='Hello1'>Ролтоп</MenuItem>
        <MenuItem value='Hello2'>Гарбуз</MenuItem>
        <MenuItem value='Hello3'>Бананка</MenuItem>
        <MenuItem value='Hello4'>Гаманець</MenuItem>
      </Select>
      <FormHelperText>
        Після вибору моделі настисніть кнопку створити новий
      </FormHelperText>
    </FormControl>
  );
};
export default DropDownModelList;
