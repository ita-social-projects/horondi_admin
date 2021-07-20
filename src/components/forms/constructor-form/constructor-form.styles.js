import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    inputError,
    imageName,
    saveButton,
    tabs,
    controlsBlock,
    attachFile,
    large,
    returnButton,
    imageUpload,
    textField,
    imageUploadAvatar,
    itemUpdate
  } = formStyles(theme);
  return {
    constructorItemUpdate: {
      ...itemUpdate
    },
    selectBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 30
    },
    avatar: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      padding: '5px',
      backgroundColor: '#ceded2'
    },
    formControl: {
      margin: theme.spacing(1),
      width: '48%'
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
    imageName,
    inputError,
    textField,
    imageUpload,
    saveButton,
    returnButton,
    attachFile,
    large,
    tabs,
    imageUploadAvatar,
    controlsBlock
  };
});
