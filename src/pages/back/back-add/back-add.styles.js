import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  backTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  }
}));
