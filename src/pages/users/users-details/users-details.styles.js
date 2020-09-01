import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: '100%',
    marginTop: 70,
    margin: theme.spacing(2),
    padding: 25
  },
  userDetails: {
    width: '35%',
    margin: '0 auto',
    [theme.breakpoints.down('lg')]: {
      width: '45%'
    },
    [theme.breakpoints.down('md')]: {
      width: '50%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));
