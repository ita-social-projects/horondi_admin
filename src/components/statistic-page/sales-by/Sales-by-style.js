import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  legend: {
    textAlign: 'center',
    padding: theme.spacing(1)
  }
}));
