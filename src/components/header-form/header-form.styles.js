import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    LARGE_STYLES,
    CONTROLS_BLOCK_STYLES,
    TABS_STYLES,
    ITEM_UPDATE_STYLES,
    DETAILS_STYLES,
    SAVE_BUTTON_STYLES,
    RETURN_BUTTON_STYLES,
    TEXT_FIELD_STYLES,
    INPUT_ERROR_STYLES
  } = formStyles(theme);
  return {
    headerItemUpdate: {
      ...ITEM_UPDATE_STYLES
    },
    headerDetails: {
      ...DETAILS_STYLES
    },
    ...SAVE_BUTTON_STYLES,
    ...RETURN_BUTTON_STYLES,
    ...LARGE_STYLES,
    ...CONTROLS_BLOCK_STYLES,
    ...TABS_STYLES,
    ...TEXT_FIELD_STYLES,
    ...INPUT_ERROR_STYLES
  };
});
