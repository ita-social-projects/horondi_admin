import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    details,
    saveButton,
    tabs,
    controlsBlock,
    itemUpdate,
    textField
  } = formStyles(theme);
  return {
    newsItemUpdate: {
      ...itemUpdate
    },
    newsDetails: {
      ...details
    },
    textField,
    tabs,
    controlsBlock,
    saveButton
  };
});
