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
      width: '100%'
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    buttons: {
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
