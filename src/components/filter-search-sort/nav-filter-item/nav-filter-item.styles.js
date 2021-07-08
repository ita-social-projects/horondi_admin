import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiButton-root': {
      padding: '6px !important'
    },
    marginTop: '-20px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 150,
    '@media (max-width: 450px)': {
      margin: 0
    }
  }
}));
