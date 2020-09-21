import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    color: '#e53935',
    left: theme.spacing(1)
  },
  buttons: {
    marginTop: theme.spacing(2)
  }
}));

export default useStyles;
