import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  detailsTitle: ({ darkMode }) => ({
    fontSize: '26px',
    fontWeight: '700',
    color: !darkMode ? '#828282' : '#ffffff',
    marginLeft: 5,
    marginBottom: 35,
    marginTop: 60,
    '@media (max-width: 450px)': {
      fontSize: '18px',
      lineHeight: '25px'
    }
  }),
  userInfoTitle: ({ darkMode }) => ({
    fontSize: '20px',
    fontWeight: '700',
    color: !darkMode ? '#828282' : '#ffffff',
    padding: '10px 0 10px 10px'
  }),
  userInfoItem: ({ darkMode }) => ({
    fontSize: '17px',
    marginTop: 0,
    fontWeight: '500',
    color: !darkMode ? '#828282' : '#ffffff',
    marginRight: 20,
    '@media (max-width: 450px)': {
      fontSize: '14px',
      marginRight: '10px'
    }
  }),
  userPaper: {
    padding: '10px'
  },
  userInfoData: {
    margin: '6px 10px',
    display: 'flex',
    alignItems: 'center'
  },
  fixedButtons: {
    position: 'fixed',
    height: 60,
    zIndex: 1001,
    backgroundColor: theme.palette.bodyColor
  },
  button: {
    marginTop: theme.spacing(0.5)
  },
  container: {
    padding: theme.spacing(2.5),
    position: 'relative',
    width: '100%',
    marginTop: 51,
    '@media (max-width: 600px)': {
      padding: '5px 20px'
    },
    '@media (max-width: 534px)': {
      paddingTop: '5px'
    },
    '@media (max-width: 481px)': {
      paddingTop: '12px'
    }
  }
}));
