import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  contactItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    paddingTop: 10
  },
  textfield: {
    margin: '10px',
    width: '100%'
  },
  contactAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  container: {
    width: '100%',
    padding: 20,
    marginTop: 70
  }
}));
