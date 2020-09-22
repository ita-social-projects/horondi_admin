import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative'
  },
  error: {
    position: 'absolute',
    color: '#e53935',
    left: theme.spacing(1),
    bottom: 39
  },
  chipContainer: {
    display: 'grid',
    gridTemplateColumns: '190px 1fr',
    marginBottom: theme.spacing(2)
  },
  chips: {
    '& div': {
      margin: '4px 6px'
    }
  }
}));
