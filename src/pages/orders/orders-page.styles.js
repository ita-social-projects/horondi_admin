import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  filterBy: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16
  },
  addButton: {
    marginLeft: '20px',
    '@media (max-width: 450px)': {
      margin:'auto',
    },
  },
  title:{
    marginBottom: '5px',
    textAlign:'center'
  }
}));
