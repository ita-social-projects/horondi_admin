import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    attachFile,
    large,
    returnButton,
    imageUpload,
    textField,
    imageUploadAvatar,
    itemUpdate,
    details,
    inputError,
    imageName,
    saveButton,
    controlsBlock
  } = formStyles(theme);
  return {
    itemUpdate: {
      ...itemUpdate,
      padding: '10px'
    },
    details: {
      ...details
    },
    imageUploadBlock: {
      display: 'flex',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    materialSelect: {
      width: '550px',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    additionalPrice: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
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
    error: {
      color: '#e60000',
      marginLeft: '5px'
    },
    inputError,
    textField,
    imageUpload,
    saveButton,
    returnButton,
    attachFile,
    large,
    imageUploadAvatar,
    controlsBlock,
    imageName
  };
});
