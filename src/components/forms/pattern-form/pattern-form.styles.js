import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    details,
    inputError,
    imageName,
    saveButton,
    tabs,
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
      ...itemUpdate
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
    tabs,
    imageUploadAvatar,
    controlsBlock
  };
});
