import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  operations: {
    display: 'flex',
    marginBottom: '20px'
  },
  tableList: {
    '& tbody': {
      cursor: 'pointer'
    }
  },
  emptyList: {
    textAlign: 'center',
    margin: '50px 0'
  }
}));
