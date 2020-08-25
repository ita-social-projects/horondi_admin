import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  patternItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    padding: '10px 10px'
  },
  patternDetails: {
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
  textfield: {
    margin: '5px 0'
  }
}));
