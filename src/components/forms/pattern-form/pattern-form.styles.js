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
      minWidth: 120
    },
    materialSelect: {
      width: '550px',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    patternItemUpdate: {
      ...itemUpdate,
      padding: '10px'
    },
    patternDetails: {
      ...details
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
