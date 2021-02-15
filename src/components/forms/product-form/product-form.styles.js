import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: '100%'
  },
  container: {
    padding: theme.spacing(2.5),
    width: '100%',
    position: 'relative'
  },
  title: {
    fontWeight: '600'
  },
  deleteBtn: {
    '& .MuiButton-outlined': {
      border: `1px solid ${theme.palette.error.main}`,
      color: theme.palette.error.light
    }
  },
  input: {
    width: 150
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
  },
  controlsBlock: {
    display: 'flex',
    margin: '40px 10px 20px 0'
  },
  showComments: {
    width: '60%',
    padding: '15px',
    marginTop: '5px',
    paddingTop: '0',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0 5%',
      width: 'auto',
      paddingTop: '15px'
    },
    '@media (max-width: 320px)': {
      margin: '0'
    }
  }
}));
