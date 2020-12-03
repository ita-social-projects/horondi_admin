import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sort: {
    display: 'flex',
    alignItems: 'center'
  },
  sortTitle: {
    width: '150px'
  },
  formControl: {
    marginLeft: theme.spacing(1),
    width: '100%',
    textTransform: 'capitalize'
  }
}));
