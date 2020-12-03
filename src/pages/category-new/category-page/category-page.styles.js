import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    textTransform: 'capitalize'
  },
  tableNav: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing('10px')
  },
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: '20px'
  },
  paginationDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  categoryTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  }
}));
