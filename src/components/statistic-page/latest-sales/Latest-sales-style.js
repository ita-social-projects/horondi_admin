import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));
