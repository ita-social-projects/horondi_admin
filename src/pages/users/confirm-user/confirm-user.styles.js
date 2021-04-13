import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: '95%',
    marginTop: 70,
    margin: theme.spacing(2),
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  userInputPanel: {
    width: '500px',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: '15px 25px',
    minWidth: 120
  },
  formSelect: {
    width: 150
  },
  registrationTitle: {
    margin: '30px 0'
  },
  saveButton: {
    height: 40,
    width: '50%',
    alignSelf: 'center'
  }
}));
