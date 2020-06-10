import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  login: {
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(1)
  }
}));
