import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
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
    padding: '5px',
    textAlign: 'center',
    borderRadius: 5,
    width: 35
  },
  label: {
    fontSize: 18
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 12
  },
  gridItem: {
    height: 120,
    width: 200
  }
}));
