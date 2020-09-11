import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    textTransform: 'capitalize'
  },
  tableNav: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  container: {
    position: 'static',
    padding: 25,
    paddingTop: 0
  },
  usersTitle: {
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  }
}));
