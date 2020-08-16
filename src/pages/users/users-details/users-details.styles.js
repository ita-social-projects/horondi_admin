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
    padding: 10,
    margin: '5px 0',
    width: '100%'
  },
  inputLabel: {
    fontSize: 12,
    '&.shrink': {
      transform: 'translate(32px, -3px) scale(0.75)'
    }
  }
}));
