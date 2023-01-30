import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    gap: 20,
    marginBottom: 30
  },
  infoSide: {
    flex: 1
  },
  avatarSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center'
  },
  btnsSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center'
  },
  username: {
    fontWeight: 'bold'
  },
  email: {
    margin: '5px 0 25px 0'
  },
  avatar: {
    width: 180,
    height: 180,
    fontSize: 64
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 30,
    padding: '30px 24px'
  },
  block: {
    margin: 20
  },
  detailTitle: {
    fontWeight: 'bold'
  },
  buttons: {
    '& button': {
      width: '100%',
      marginBottom: '15px'
    }
  }
}));
