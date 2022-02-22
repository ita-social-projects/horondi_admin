import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  status: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '0px'
  },
  redStatus: {
    color: 'red'
  },
  blueStatus: {
    color: 'blue'
  },
  greenStatus: {
    color: 'green'
  },
  pendingStatus: {
    color: 'grey'
  }
}));
