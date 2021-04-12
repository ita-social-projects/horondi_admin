import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { uk } from 'date-fns/locale';

export default function MaterialUIPickers({
  items
}) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  return (
    <MuiPickersUtilsProvider locale={uk} utils={DateFnsUtils}>
      <Grid container justify="flex-start">

        <KeyboardDatePicker
          autoOk
          margin="normal"
          id="date-picker-dialog"
          label="Від"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>
  );
}
