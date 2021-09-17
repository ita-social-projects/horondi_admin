import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    details,
    inputError,
    imageName,
    saveButton,
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
    imageUploadBlock: {
      display: 'flex',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginTop: 20
    },
    materialSelect: {
      width: '550px',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    currencyField: {
      width: '170px',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    patternItemAdd: {
      width: '550px',
      display: 'flex',
      flexWrap: 'wrap',
      margin: '20px 0',
      '@media (max-width: 900px)': {
        width: '300px',
        margin: '20px auto 20px'
      }
    },
    purposeSelect: {
      width: '550px',
      margin: '10px',
      '@media (max-width: 900px)': {
        width: '300px',
        display: 'block',
        margin: 'auto'
      }
    },
    select: {
      '@media (max-width: 900px)': {
        width: '100%'
      }
    },
    patternItemUpdate: {
      ...itemUpdate,
      padding: '10px'
    },
    patternDetails: {
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
      backgroundColor: theme.palette.bodyColor
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    patternInputFile: { display: 'none' },
    patternTitle: {
      marginBottom: '10px',
      fontSize: 24,
      color: theme.palette.text.disabled,
      fontWeight: 'bold'
    },
    imageName,
    inputError,
    textField,
    imageUpload,
    saveButton,
    returnButton,
    attachFile,
    large,
    imageUploadAvatar,
    controlsBlock
  };
});
