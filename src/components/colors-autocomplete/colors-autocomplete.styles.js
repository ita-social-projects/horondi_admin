import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  colorCircleInTextfield: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  root: {
<<<<<<< HEAD
    width: '400px',
    marginRight: '15px',
    '@media (max-width: 450px)': {
      width: '100%'
    }
=======
    width: '250px',
    marginRight: '15px'
>>>>>>> c56feb8898d4f0aa6ed9758162002f9f116bf709
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
