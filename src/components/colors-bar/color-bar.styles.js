import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  colorBar: {
    display: 'flex',
    alignItems: 'center'
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
    marginRight: '15px'
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
