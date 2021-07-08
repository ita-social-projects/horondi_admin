import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  operations: {
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
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
    marginBottom: '22px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
  emptyList: {
    textAlign: 'center',
    margin: '50px 0'
  }
}));
