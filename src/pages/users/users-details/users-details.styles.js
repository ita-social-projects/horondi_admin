import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    display: 'flex',
    width: '100%',
    marginTop: 70,
    margin: theme.spacing(2),
    padding: 25,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      justifyContent: 'center'
    }
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
  },
  showComments: {
    width: '60%',
    padding: '15px',
    paddingTop: '0',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0 5%',
      width: 'auto',
      paddingTop: '15px'
    }
  }
}));
