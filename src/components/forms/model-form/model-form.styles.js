import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {

  const {
    details,
    returnButton,
    saveButton,
    textField,
    autoComplete,
    controlsBlock,
    tabs,
    large,
    attachFile,
    imageUpload,
    itemUpdate,
    inputError,
    imageUploadAvatar,
    imageName,
    inputLabel,
    formControl,
    purposeSelect
  } = formStyles(theme);
  return {
    constructorButton:{
      display:'inline',
      '@media (max-width: 450px)': {
        '& button':{
          margin:'10px 0px 10px'
        },
      },
    },
    modelItemUpdate: {
      ...itemUpdate
    },
    modelDetails: {
      ...details
    },
    returnButton,
    saveButton,
    textField,
    autoComplete,
    controlsBlock,
    tabs,
    large,
    attachFile,
    imageUpload,
    inputError,
    imageUploadAvatar,
    imageName,
    inputLabel,
    formControl,
    purposeSelect
  };
});
