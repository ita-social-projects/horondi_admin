import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  contactItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    paddingTop: 10
  },
  textfield: {
    textTransform: 'uppercase',
    padding: 10,
    margin: '5px 0',
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
  },
  inputLabel: {
    fontSize: 12,
    '&.shrink': {
      transform: 'translate(32px, -3px) scale(0.75)'
    }
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  }
}));
