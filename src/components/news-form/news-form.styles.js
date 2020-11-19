import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    DETAILS_STYLES,
    SAVE_BUTTON_STYLES,
    TABS_STYLES,
    CONTROLS_BLOCK_STYLES,
    ITEM_UPDATE_STYLES,
    TEXT_FIELD_STYLES
  } = formStyles(theme);
  return {
    newsItemUpdate: {
      ...ITEM_UPDATE_STYLES
    },
    newsDetails: {
      ...DETAILS_STYLES
    },
    ...TEXT_FIELD_STYLES,
    ...TABS_STYLES,
    ...CONTROLS_BLOCK_STYLES,
    ...SAVE_BUTTON_STYLES
  };
});
