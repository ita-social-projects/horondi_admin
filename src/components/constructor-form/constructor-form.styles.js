import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
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
    constructorItemUpdate: {
      ...itemUpdate
    },
    selectBox:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center'
    },
    avatar:{
      width: theme.spacing(8),
      height: theme.spacing(8),
      padding:'5px',
      backgroundColor:'#ceded2'
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
