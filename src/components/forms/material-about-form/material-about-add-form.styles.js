import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: '100%'
  },
  container: {
    padding: theme.spacing(2.5),
    width: '100%',
    position: 'relative',
    paddingTop: '20px'
  },
  imgTitle: {
    color: '#3f51b5',
    padding: '5px'
  },
  buttonContainer: {
    position: 'relative',
    width: '100%',
    height: '60px',
    marginTop: '50px'
  },
  fixedButtons: {
    position: 'fixed',
    height: '60px',
    zIndex: 1001,
    backgroundColor: theme.palette.bodyColor
  }
}));
