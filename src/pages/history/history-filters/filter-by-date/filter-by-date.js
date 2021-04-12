import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import DesktopDateRangePicker from '@material-ui/lab/DesktopDateRangePicker';

export default function FilterByDate() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDateRangePicker
        startText="Desktop start"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} variant="standard" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} variant="standard" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
