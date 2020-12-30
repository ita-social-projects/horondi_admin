import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableNav: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  table: {
    textTransform: 'capitalize'
  },
  paginationDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 20
  },
  patternTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  }
}));
