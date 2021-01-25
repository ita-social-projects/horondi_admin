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
