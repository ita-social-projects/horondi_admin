import { makeStyles } from '@material-ui/core';

const fontStyle = ({ palette }, fontSize = 12, isBold = false) => {
  let fontWeight = '400';
  if (isBold) {
    fontWeight = 'bold';
  }

  return {
    fontSize,
    color: palette.text.disabled,
    fontWeight
  };
};

export const useStyles = makeStyles((theme) => ({
  userBlock: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10
  },
  userAvatar: {
    [theme.breakpoints.up('sm')]: {
      marginRight: 5
    },
    marginRight: 30
  },
  userHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 10px'
  },
  userStatusBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  userName: fontStyle(theme, 14, true),
  userStatus: fontStyle(theme, 10, false)
}));
