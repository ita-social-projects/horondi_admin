import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { imageUpload, textField, inputError, tabs, imageUploadAvatar } =
    formStyles(theme);
  return {
    formContainer: {
      width: '100%',
      padding: '20px',
      '@media (max-width: 600px)': {
        'padding': '10px 20px'
      },
      '@media (max-width: 481px)': {
        'marginTop': '10px'
      }
    },
    slideItemUpdate: {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px 0px',
      padding: '10px'
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
    },
    buttonContainer: {
      position: 'relative',
      width: '100%',
      height: 60,
      marginTop: 51,
      '@media (max-width: 600px)': {
        marginTop: 43
      }
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
    imageUpload,
    textField,
    tabs,
    inputError,
    imageUploadAvatar
  };
});
