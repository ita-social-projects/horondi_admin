import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  colorBar: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 450px)': {
      flexDirection: 'column-reverse'
    }
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
  },

  root: {
    width: '400px',
    marginRight: '152px',
    '@media (max-width: 450px)': {
      margin: '15px 0px 15px'
    }
  },

  materialItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0 !important'
  },

  materialName: {
    fontSize: '18px',
    marginRight: '10px',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
}));
