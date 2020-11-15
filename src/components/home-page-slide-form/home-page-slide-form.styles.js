import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',
    padding: '20px'
  },
  slideItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0px'
  },
  formButton: {
    margin: theme.spacing(2),
    marginRight: 0,
    '@media (max-width: 768px)': {
      margin: theme.spacing(1)
    },
    '@media (max-width: 576px)': {
      zoom: '80%'
    }
  },
  textField: {
    margin: '10px 5px'
  },
  tabs: {
    backgroundColor: 'white',
    '& span.MuiTab-wrapper': {
      color: '#3F51B5'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: '#3F51B5'
    }
  },

  inputError: {
    color: '#e60000',
    marginLeft: '5px'
  },

  imageUpload: {
    fontSize: 14,
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  square: {
    position: 'absolute',
    height: '90%',
    width: '90%',
    backgroundColor: 'gray'
  },
  slideContent: {
    paddingTop: theme.spacing(2),
    position: 'absolute',
    height: '90%',
    width: '90%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textShadow: '2px 2px 5px black'
  },
  mainContent: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    '@media (max-width: 576px)': {
      marginTop: theme.spacing(1)
    }
  },
  mainContentTitle: {
    fontSize: theme.spacing(3),
    margin: '0px',
    '@media (max-width: 576px)': {
      fontSize: theme.spacing(2)
    }
  },
  mainContentDescription: {
    fontSize: theme.spacing(2),
    padding: theme.spacing(1),
    '@media (max-width: 576px)': {
      fontSize: '14px'
    }
  },
  discoverMore: {
    position: 'absolute',
    bottom: '0px',
    fontSize: theme.spacing(2),
    '& span': {
      paddingLeft: '3px'
    },
    '@media (max-width: 576px)': {
      fontSize: '14px'
    }
  },
  slideWrapper: {
    margin: theme.spacing(2),
    width: theme.spacing(70),
    height: theme.spacing(40),
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      width: '100%',
      height: theme.spacing(40),
      margin: 0
    },
    '@media (max-width: 576px)': {
      height: theme.spacing(25)
    },
    '@media (max-width: 375px)': {
      height: theme.spacing(20)
    }
  },
  slideIcon: {
    height: '100px',
    width: '100px',
    '@media (max-width: 576px)': {
      height: '60px',
      width: '60px'
    }
  },
  slideTitle: {
    paddingLeft: theme.spacing(1),
    fontSize: theme.spacing(3),
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    '@media (max-width: 375px)': {
      fontSize: theme.spacing(2)
    }
  }
}));
