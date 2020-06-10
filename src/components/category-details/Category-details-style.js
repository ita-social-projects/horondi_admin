import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  categoryEdit: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    flexGrow: 1,
    paddingTop: 70
  },
  checkbox: {
    margin: theme.spacing(1)
  },
  button: {
    width: 300
  },
  formLable: {
    marginLeft: theme.spacing(2)
  },
  textfield: {
    textTransform: 'uppercase',
    margin: 20,
    width: 300
  }
}));
