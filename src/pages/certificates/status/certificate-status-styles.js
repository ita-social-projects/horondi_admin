import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  status: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '0px'
  },
  expiredStatus: {
    color: 'red'
  },
  usedStatus: {
    color: 'blue'
  },
  activeStatus: {
    color: 'green'
  },
  pendingStatus: {
    color: 'grey'
  }
}));
