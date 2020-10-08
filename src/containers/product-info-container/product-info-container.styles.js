import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative'
  },
  textfield: {
    margin: theme.spacing(1),
    width: '100%'
  },
  title: {
    fontWeight: 600
  },
  paper: {
    flexGrow: 1
  },
  editor: {
    width: '100%'
  },
  error: {
    position: 'absolute',
    color: theme.palette.error.main,
    left: theme.spacing(1),
    bottom: 0.5
  }
}));

export default useStyles;
