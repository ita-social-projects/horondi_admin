import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  quantity: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  'MuiSvgIcon-root': {
    fontSize: 28
  },
  H5: {
    border: '1px solid gray',
    padding: '5px 12px',
    borderRadius: '5px',
    width: '35px'
  },
  label: {
    fontSize: '18px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  gridItem: {
    height: '100px',
    width: '100px'
  }
}));
