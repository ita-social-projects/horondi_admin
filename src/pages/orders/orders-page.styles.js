import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  filterBy: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16
  },
  addButton: {
    marginLeft: '20px'
  },
  title:{
    marginBottom: '5px'
  }
}));
