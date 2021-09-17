import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

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
    imageUploadBlock: {
      display: 'flex',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    },
    backItemUpdate: {
      ...itemUpdate,
      padding: '10px'
    },
    backDetails: {
      ...details
    },
    additionalPrice: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
    },
    currencyField: {
      width: '170px',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginTop: 20
    },
    materialSelect: {
      width: '100%',
      margin: '10px 0',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    fixedButtons: {
      position: 'fixed',
      height: 60,
      zIndex: 1001,
      backgroundColor: theme.palette.bodyColor
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
    error: {
      color: '#e60000',
      marginLeft: '5px'
    },
    button: {
      marginTop: theme.spacing(0.5)
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
