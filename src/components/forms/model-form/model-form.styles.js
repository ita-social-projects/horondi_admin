import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    details,
    returnButton,
    saveButton,
    textField,
    autoComplete,
    controlsBlock,
    tabs,
    large,
    attachFile,
    imageUpload,
    itemUpdate,
    inputError,
    imageUploadAvatar,
    imageName,
    inputLabel,
    formControl,
    purposeSelect
  } = formStyles(theme);
  return {
    constructorButton: {
      display: 'inline',
      '@media (max-width: 450px)': {
        '& button': {
          margin: '10px 0px 10px'
        }
      }
    },
    modelItemUpdate: {
      ...itemUpdate
    },
    modelDetails: {
      ...details
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
      backgroundColor: theme.palette.bodyColor,
    '@media (max-width: 365px)': {
      'height': '60px'
    }
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    returnButton,
    saveButton,
    textField,
    autoComplete,
    controlsBlock,
    tabs,
    large,
    attachFile,
    imageUpload,
    inputError,
    imageUploadAvatar,
    imageName,
    inputLabel,
    formControl,
    purposeSelect
  };
});
