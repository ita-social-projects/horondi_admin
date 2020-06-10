import { makeStyles } from '@material-ui/styles';
import { green, red, blue } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  delivered: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0,
    height: theme.spacing(1.3),
    width: theme.spacing(1.3),
    backgroundColor: green[500],
    marginRight: theme.spacing(1)
  },
  pending: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0,
    height: theme.spacing(1.3),
    width: theme.spacing(1.3),
    backgroundColor: blue[500],
    marginRight: theme.spacing(1)
  },
  canceled: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0,
    height: theme.spacing(1.3),
    width: theme.spacing(1.3),
    backgroundColor: red[500],
    marginRight: theme.spacing(1)
  },
  editButton: {
    margiinLeft: 5
  }
}));
