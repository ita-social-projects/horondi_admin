import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  contactItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    paddingTop: 10
  },
  textfield: {
    margin: '10px',
    width: '100%'
  },
  contactAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(120%);',
      transition: '.3s'
    },
    '@media (max-width: 768px)': {
      width: theme.spacing(7),
      height: theme.spacing(7)
    }
  },
  paper: {
    padding: theme.spacing(2)
  },
  uploadContainer: {
    position: 'relative',
    '&:hover': {
      opacity: 1
    }
  },
  overlay: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    height: '100%',
    width: '100%',
    opacity: '0',
    backgroundColor: '#ccc',
    transition: 'all .3s ease',
    '&:hover': {
      opacity: 1,
      filter: 'brightness(.8)'
    }
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    fontSize: '1.2rem'
  },
  uploadIcon: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    opacity: '.9',
    '@media (max-width: 768px)': {
      width: theme.spacing(4),
      height: theme.spacing(4)
    }
  }
}));
