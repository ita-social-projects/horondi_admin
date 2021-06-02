import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sort: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    '@media (max-width: 450px)': {
      marginLeft: 0,
      width: '100%'
    }
  }
}));
