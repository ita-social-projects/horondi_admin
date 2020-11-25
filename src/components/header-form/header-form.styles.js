import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    large,
    controlsBlock,
    tabs,
    itemUpdate,
    details,
    saveButton,
    returnButton,
    textField,
    inputError
  } = formStyles(theme);
  return {
    headerItemUpdate: {
      ...itemUpdate
    },
    headerDetails: {
      ...details
    },
    saveButton,
    returnButton,
    large,
    controlsBlock,
    tabs,
    textField,
    inputError
  };
});
