import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 0
  },
  operations: {
    marginBottom: '20px'
  },
  tableList: {
    '& thead tr': {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: '48px',
      marginRight: '52px'
    },
    '& thead tr th': {
      flex: '1',
      '&:last-child': {
        flex: '0'
      }
    },
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
