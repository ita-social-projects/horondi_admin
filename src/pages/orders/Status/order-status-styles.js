import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  redStatus: {
    fontWeight: 'bold',
    color: 'red'
  },
  blueStatus: {
    fontWeight: 'bold',
    color: 'blue'
  },
  greenStatus: {
    fontWeight: 'bold',
    color: 'green'
  }
}));
