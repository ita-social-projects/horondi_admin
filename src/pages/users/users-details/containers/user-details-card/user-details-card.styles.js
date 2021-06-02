import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 180,
    height: 180,
    fontSize: 64
  },
  block: {
    margin: 20
  },
  detailTitle: {
    fontWeight: 'bold'
  },
  status: {
    textAlign: 'center'
  },
  buttons: {
    '& button': {
      width: '100%',
      marginBottom: '15px'
    }
  }
}));
