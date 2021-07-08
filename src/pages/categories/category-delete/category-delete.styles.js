import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: '100%',
    margin: theme.spacing(1),
    '@media (max-width: 450px)': {
      padding: 0
    }
  },
  deletePanel: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formControl: {
    margin: '0px 0px 15px',
    width: '100%'
  },
  formSelect: {
    width: 300,
    marginTop: '40px !important',
    '@media (max-width: 450px)': {
      width: 'inherit'
    }
  },
  saveButton: {
    height: 40
  }
}));
