import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: '55px',
    padding: '20px'
  },
  gridContainer: {
    height: '100%'
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: '1',
    textTransform: 'uppercase'
  },
  orderInfo: {
    margin: '10px 0',
    padding: '20px'
  },
  itemsPaper: {
    padding: '10px'
  },
  itemsDetail: {
    margin: '10px 0'
  }
}));
