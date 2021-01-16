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
  },
  container: {
    marginTop: 65,
    padding: theme.spacing(2),
    width: '100%'
  },
  input: {
    width: '300px',
    margin: theme.spacing(1)
  },
  inputError: {
    color: '#e60000'
  }
}));
