import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    returnButton,
    saveButton,
    tabs,
    controlsBlock,
    itemUpdate,
    textField,
    imageUpload,
    imageUploadAvatar
  } = formStyles(theme);
  return {
    newsItemUpdate: {
      ...itemUpdate,
      marginTop: 0,
      padding: '10px'
    },
    inputError: {
      color: '#e60000',
      marginLeft: '5px'
    },
    inputBlock: {
      margin: '10px 0'
    },
    textArea: {
      width: '400px',
      resize: 'none'
    },
    formContainer: {
      width: '100%',
      padding: 20,
      marginTop: 70
    },
    imageUploadBlock: {
      display: 'flex',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    },
    buttonContainer: {
      position: 'relative',
      width: '100%',
      height: 60,
      marginTop: -13,
      '@media (max-width: 600px)': {
        marginTop: -21
      }
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    fixedButtons: {
      position: 'fixed',
      height: 60,
      zIndex: 1001,
      backgroundColor: theme.palette.bodyColor
    },
    textField,
    tabs,
    controlsBlock,
    returnButton,
    saveButton,
    imageUpload,
    imageUploadAvatar
  };
});
