import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    marginTop: 65,
    padding: 20,
    minHeight: '30vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: ' column'
  },
  adminHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '45px',
    '@media (max-width: 450px)': {
      display: 'block'
    }
  },
  materialTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    '@media (max-width: 450px)': {
      fontSize: theme.spacing(2)
    }
  }
}));
