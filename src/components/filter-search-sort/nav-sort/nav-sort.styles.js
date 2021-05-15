import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sort: {
    display: 'flex',
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    marginTop: -11,
    width: 120
  }
}));
