import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  clearButton: {
    height: '36px'
  },
  root: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    },
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 230,
    height: '36px',
    '@media (max-width: 450px)': {
      width: '95%',
      margin:'auto'
    },
    '& div':{
      width:'100%'
    },
  },
  iconButton: {
    padding: 10
  }
}));
