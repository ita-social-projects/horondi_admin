import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    attachFile,
    imageUpload,
    imageUploadAvatar,
    large,
    returnButton,
    saveButton,
    details,
    inputError,
    imageName
  } = formStyles(theme);
  return {
    contactItemUpdate: {
      display: 'flex',
      flexDirection: 'column',
      padding: 10
    },
    textField: {
      '&:first-letter': {
        textTransform: 'capitalize'
      },
      margin: '10px'
    },
    detailsContainer: {
      width: '100%',
      padding: 20
    },
    contactDetails: {
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
    saveButton,
    returnButton,
    inputError,
    imageUploadAvatar,
    large,
    imageName,
    imageUpload,
    attachFile
  };
});
