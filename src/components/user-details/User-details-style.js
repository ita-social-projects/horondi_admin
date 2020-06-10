import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  selectElement: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: 200
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    },
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));
