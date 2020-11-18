import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    DETAILS_STYLES,
    SAVE_BUTTON_STYLES,
    RETURN_BUTTON_STYLES,
    TEXT_FIELD_STYLES,
    CONTROLS_BLOCK_STYLES,
    TABS_STYLES,
    LARGE_STYLES,
    ATTACH_FILE_STYLES,
    IMAGE_UPLOAD_STYLES,
    ITEM_UPDATE_STYLE,
    INPUT_ERROR_STYLES,
    IMAGE_UPLOAD_CONTAINER_STYLES,
    IMAGE_NAME_STYLE
  } = formStyles(theme);
  return {
    modelItemUpdate: {
      ...ITEM_UPDATE_STYLE
    },
    modelDetails: {
      ...DETAILS_STYLES
    },
    ...INPUT_ERROR_STYLES,
    ...IMAGE_UPLOAD_CONTAINER_STYLES,
    ...IMAGE_NAME_STYLE,
    ...IMAGE_UPLOAD_STYLES,
    ...ATTACH_FILE_STYLES,
    ...LARGE_STYLES,
    ...SAVE_BUTTON_STYLES,
    ...RETURN_BUTTON_STYLES,
    ...TEXT_FIELD_STYLES,
    ...TABS_STYLES,
    ...CONTROLS_BLOCK_STYLES
  };
});
