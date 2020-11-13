import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: '100%',
    margin: theme.spacing(1),
    padding: 10
  },
  deletePanel: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formControl: {
    margin: '15px 20px',
    minWidth: 120
  },
  formSelect: {
    width: 300
  },
  saveButton: {
    height: 40
  }
}));
