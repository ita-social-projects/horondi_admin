import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    position: 'relative',
    width: '100%',
    height: 60,
    marginTop: 51,
    '@media (max-width: 600px)': {
      marginTop: '42px'
    }
  },
  fixedButtons: {
    position: 'fixed',
    height: 60,
    zIndex: 1001,
    backgroundColor: theme.palette.bodyColor,
    '@media (max-width: 416px)': {
      height: '112px'
    }
  },
  button: {
    marginTop: theme.spacing(0.5)
  }
}));
