import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sort: {
    display: 'flex',
    alignItems: 'center'
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  }
}));
