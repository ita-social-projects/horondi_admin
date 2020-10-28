import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: '100%',
    margin: theme.spacing(1),
    padding: 15
  },
  userInputPanel: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: '15px 25px',
    minWidth: 120
  },
  formSelect: {
    width: 120
  },
  registrationTitle: {
    margin: '10px 0'
  },
  saveButton: {
    height: 40
  }
}));
