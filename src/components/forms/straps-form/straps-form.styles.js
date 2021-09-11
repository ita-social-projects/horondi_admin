import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    saveButton,
    textField,
    imageUpload,
    imageUploadAvatar,
    returnButton
  } = formStyles(theme);
  return {
    error: {
      color: '#e60000',
      marginLeft: '5px'
    },
    buttonContainer: {
      position: 'relative',
      width: '100%',
      height: 90,
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
      height: 90,
      zIndex: 1001,
      backgroundColor: theme.palette.bodyColor
    },
    additionalPrice: {
      width: '550px',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    colorPaper: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
    },
    additionalPricePaper: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
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
    colorSelect: {
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
    textField,
    saveButton,
    imageUpload,
    imageUploadAvatar,
    returnButton
  };
});
