import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    maxWidth: '100%'
  },
  container: {
    padding: theme.spacing(2.5),
    width: '100%',
    position: 'relative',
    paddingTop: '20px'
  },
  title: {
    color: '#3f51b5',
    padding: '5px'
  },
  imageUploadContainer: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
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
