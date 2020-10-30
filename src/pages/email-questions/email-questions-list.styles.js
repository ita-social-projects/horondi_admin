import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    textTransform: 'capitalize'
  },
  tableNav: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  operations: {
    display: 'flex'
  },
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 20
  },
  tableList: {
    '& tbody': {
      cursor: 'pointer'
    }
  },
  paginationDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  title: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
  emptyList: {
    textAlign: 'center',
    margin: '50px 0'
  }
}));
