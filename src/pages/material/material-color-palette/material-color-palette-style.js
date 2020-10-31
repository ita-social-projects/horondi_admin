import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    textTransform: 'capitalize'
  },
  tableNav: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 20
  },
  paginationDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  materialTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
  returnButton: {
    marginRight: '20px',
    padding: '5px'
  }
}));
