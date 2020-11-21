import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  orderCount: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: '10px'
  },
  filterBy: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16
  }
}));
