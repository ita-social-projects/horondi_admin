import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  },
  numberInputControl: {
    margin: theme.spacing(1),
    width: 180
  },
  error: {
    position: 'absolute',
    color: '#e53935',
    left: theme.spacing(1)
  },
  buttons: {
    marginTop: theme.spacing(2)
  }
}));
