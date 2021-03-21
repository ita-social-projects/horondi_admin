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
      ...itemUpdate
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
    textField,
    tabs,
    controlsBlock,
    returnButton,
    saveButton,
    imageUpload,
    imageUploadAvatar
  };
});
