import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  newsItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    paddingTop: 10
  },
  newsDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  inputLabel: {
    fontSize: 12,
    '&.shrink': {
      transform: 'translate(32px, -3px) scale(0.75)'
    }
  },
  textField: {
    textTransform: 'uppercase',
    padding: 10,
    margin: '5px 0',
    width: '100%'
  }
}));
