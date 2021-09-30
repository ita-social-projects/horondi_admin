import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    imageUploadAvatar,
    returnButton,
    inputError,
    saveButton,
    textField,
    imageUpload
  } = formStyles(theme);
  return {
    error: {
      color: '#e60000',
      marginLeft: '5px'
    },
    fixedButtons: {
      position: 'fixed',
      height: 90,
      zIndex: 1001,
      backgroundColor: theme.palette.bodyColor
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    buttonContainer: {
      position: 'relative',
      width: '100%',
      height: 90,
      marginTop: 70,
      marginLeft: 10,
      '@media (max-width: 600px)': {
        marginTop: -21
      }
    },
    userImage: {
      marginLeft: '200px',
      paddingBottom: '20px'
    },
    colorPaper: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 20px',
      padding: '10px',
      width: '700px'
    },
    inputPanel: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginTop: 20
    },
    textField,
    saveButton,
    imageUpload,
    imageUploadAvatar,
    returnButton,
    inputError
  };
});
