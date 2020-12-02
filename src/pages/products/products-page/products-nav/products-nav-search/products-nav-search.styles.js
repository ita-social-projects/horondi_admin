import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  clearButton: {
    height: '36px'
  },
  root: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    },
    padding: '2px 4px',
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '36px'
  },
  searchInput: {
    width: '100%',
  },
  iconButton: {
    padding: 10,
    right: 0
  }
}));
