import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  }
}));

export default useStyles;
