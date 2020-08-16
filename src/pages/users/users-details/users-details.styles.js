import { makeStyles } from '@material-ui/styles';

const fontStyle = (fontSize = 12, isBold = false, { palette }) => {
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
  detailsContainer: {
    width: '100%',
    marginTop: 70,
    margin: theme.spacing(2),
    padding: 25
  },
  detailsTitle: fontStyle(24, true, theme),
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
  userName: fontStyle(14, true, theme),
  userStatus: fontStyle(10, false, theme),
  userDetails: {
    width: '95%'
  },
  textField: {
    textTransform: 'uppercase',
    margin: '10px 5px'
  },
  inputLabel: {
    fontSize: 12
  }
}));
