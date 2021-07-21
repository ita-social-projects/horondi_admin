import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  saveButton: {
    marginRight: theme.spacing(1),
    '@media (max-width: 576px)': {
      zoom: '80%'
    },
    '@media (max-width: 375px)': {
      width: '100%',
      marginBottom: '15px'
    },
    '@media (max-width: 450px)': {
      width: '100%',
      marginBottom: '15px'
    }
  }
}));
