import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  controlsBlock: {
    display: 'flex',
    margin: '20px 0'
  },
  buttonContainer: {
    position: 'relative',
    width: '100%',
    height: 60,
    marginTop: 51,
    '@media (max-width: 600px)': {
      marginTop: '36px'
    },
    '@media (max-width: 333px)': {
      marginTop: '43px'
    }
  },
  fixedButtons: {
    position: 'fixed',
    height: 60,
    zIndex: 1001,
    backgroundColor: theme.palette.bodyColor
  },
  button: {
    marginTop: theme.spacing(0.5)
  }
}));
