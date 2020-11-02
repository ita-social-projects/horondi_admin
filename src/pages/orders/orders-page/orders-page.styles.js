import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 20,
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  orderCount: {
    marginBottom: '20px',
    fontSize: 16
  },
  filterBy: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '20%',
    fontSize: 16
  },
  ordersDisabledTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.text.disabled,
    margin: 'auto'
  }
}));
