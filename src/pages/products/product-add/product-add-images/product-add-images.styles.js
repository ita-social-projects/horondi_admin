import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative'
  },
  error: {
    color: theme.palette.error.main,
    padding: '10px 0 0 0'
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
  },
  avatarWrapper: {
    display: 'flex',
    '& div': {
      margin: '5px 10px 0 0'
    }
  }
}));
