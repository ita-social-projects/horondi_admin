import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    details,
    inputError,
    imageName,
    saveButton,
    imageUploadContainer,
    tabs,
    controlsBlock,
    attachFile,
    large,
    returnButton,
    imageUpload,
    textField,
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
    imageUploadContainer,
    textField,
    imageUpload,
    saveButton,
    returnButton,
    attachFile,
    large,
    tabs,
    controlsBlock
  };
});
