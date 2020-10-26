import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    textTransform: 'capitalize'
  },
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 25
  },
  usersTitle: {
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
  tabs: {
    color: '#fff'
  }
}));
