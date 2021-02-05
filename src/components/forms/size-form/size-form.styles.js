import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { textField, imageUpload, itemUpdate } = formStyles(theme);
  return {
    sizeFrom: {
      width: '100%'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    formTitle: {
      ...imageUpload
    },
    sizeItemUpdate: {
      ...itemUpdate
    },
    textField
  };
});
