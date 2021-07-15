import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  columnContainer: {
    margin: '8px',
    borderRadius: '2px',
    display: 'flex',
    flexDirection: 'column'
  },
  taskListContainer: {
    padding: '8px',
    transition: 'background-color 0.2s ease',
    flexGrow: 1,
    flexWrap: 'wrap',
    display: 'flex',
    '& div': {
      marginLeft: 0,
      marginRight: 0
    }
  }
}));
