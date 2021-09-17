import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  saveCommentButton: {
    margin: theme.spacing(2)
  },
  paper: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    margin: '10px 5px',
    width: '1150px'
  },
  error: {
    color: '#e60000',
    marginLeft: '5px'
  },
  buttonContainer: {
    position: 'relative',
    width: '100%',
    height: 60,
    marginTop: 51,
    '@media (max-width: 600px)': {
      marginTop: 43
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
