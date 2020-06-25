import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  newsItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    flexGrow: 1,
    marginTop: 70
  },
  textfield: {
    textTransform: 'uppercase',
    margin: 10,
    width: 400
  },
  newsAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
  }
}));
