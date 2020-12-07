import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    attachFile,
    imageUpload,
    imageUploadContainer,
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
      margin: theme.spacing(2),
      paddingTop: 10
    },
    textField: {
      '&:first-letter': {
        textTransform: 'capitalize'
      },
      margin: '10px'
    },
    detailsContainer: {
      width: '100%',
      padding: 20,
      marginTop: 70
    },
    contactDetails: {
      ...details
    },
    saveButton,
    returnButton,
    inputError,
    imageUploadContainer,
    large,
    imageName,
    imageUpload,
    attachFile
  };
});
