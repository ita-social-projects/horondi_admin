import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(3)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: '0 auto'
  }
}));
