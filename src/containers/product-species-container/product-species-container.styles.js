import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  numberInputControl: {
    margin: theme.spacing(1),
    width: 150
  },
  error: {
    position: 'absolute',
    color: theme.palette.error.main,
    left: theme.spacing(1)
  },
  buttons: {
    marginTop: theme.spacing(2)
  }
}));
