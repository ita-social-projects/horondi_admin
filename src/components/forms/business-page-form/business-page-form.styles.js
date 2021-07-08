import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  businessPageForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0',
    padding: '10px'
  },
  textField: {
    margin: '10px 5px'
  },
  tabs: {
    backgroundColor: '#424242'
  },
  controlsBlock: {
    display: 'flex',
    marginTop: 20
  },
  container: {
    padding: theme.spacing(2.5),
    width: '100%',
    position: 'relative',
    '@media (max-width: 481px)': {
      'marginTop': '6px'
    }
  },
  buttonContainer: {
    position: 'relative',
    width: '100%',
    height: 60,
    marginTop: 51,
    '@media (max-width: 600px)': {
      'marginTop': '36px'
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
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    marginLeft: 15,
    fontSize: '.9em'
  },
  tabField: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column'
  }
}));
