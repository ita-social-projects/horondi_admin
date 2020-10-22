import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 20
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
    fontSize: 16
  }
}));
