import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: '100%',
    marginTop: 70,
    padding: 25
  },
  userBlock: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    paddingTop: 10
  },
  userDetails: {
    width: '95%'
  },
  textField: {
    textTransform: 'uppercase',
    padding: 10,
    margin: '5px 0',
    width: '100%'
  },
  inputLabel: {
    fontSize: 12,
    '&.shrink': {
      transform: 'translate(32px, -3px) scale(0.75)'
    }
  }
}));
