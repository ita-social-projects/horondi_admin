import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    details,
    returnButton,
    saveButton,
    textField,
    controlsBlock,
    tabs,
    large,
    attachFile,
    imageUpload,
    itemUpdate,
    inputError,
    imageUploadContainer,
    imageName
  } = formStyles(theme);
  return {
    modelItemUpdate: {
      ...itemUpdate
    },
    modelDetails: {
      ...details
    },
    returnButton,
    saveButton,
    textField,
    controlsBlock,
    tabs,
    large,
    attachFile,
    imageUpload,
    inputError,
    imageUploadContainer,
    imageName
  };
});
