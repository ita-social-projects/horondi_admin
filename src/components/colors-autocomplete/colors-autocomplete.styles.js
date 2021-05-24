import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  colorCircleInTextfield: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  root: {
    width: '400px',
    marginRight: '15px',
    '@media (max-width: 450px)': {
      width: '100%',
      marginTop:'15px',
      marginRight:0,
    }
  },
  checkbox: {
    marginRight: 8
  },
  selectOptionRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& div': {
      display: 'flex',
      alignItems: 'center'
    }
  }
}));
