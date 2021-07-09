import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { saveButton, textField, imageUpload, imageUploadAvatar } =
    formStyles(theme);
  return {
    error: {
      color: '#e60000',
      marginLeft: '5px'
    },
    imageUploadContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px'
    },
    large: {
      marginLeft: '10px',
      width: theme.spacing(6),
      height: theme.spacing(6)
    },
    imageName: {
      fontSize: '.9rem',
      marginLeft: '10px',
      color: 'rgba(0, 0, 0, 0.54)',
      '@media (max-width: 768px)': {
        display: 'none'
      }
    },
    attachFile: {
      marginRight: '5px'
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
    additionalPrice: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
    },
    textField,
    saveButton,
    imageUpload,
    imageUploadAvatar
  };
});
