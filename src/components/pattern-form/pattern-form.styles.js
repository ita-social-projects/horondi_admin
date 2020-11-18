import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    DETAILS_STYLES,
    INPUT_ERROR_STYLES,
    IMAGE_NAME_STYLE,
    SAVE_BUTTON_STYLES,
    IMAGE_UPLOAD_CONTAINER_STYLES,
    TABS_STYLES,
    CONTROLS_BLOCK_STYLES,
    ATTACH_FILE_STYLES,
    LARGE_STYLES,
    RETURN_BUTTON_STYLES,
    IMAGE_UPLOAD_STYLES,
    TEXT_FIELD_STYLES,
    ITEM_UPDATE_STYLE
  } = formStyles(theme);
  return {
    patternItemUpdate: {
      ...ITEM_UPDATE_STYLE
    },
    patternDetails: {
      ...DETAILS_STYLES
    },
    ...IMAGE_NAME_STYLE,
    ...INPUT_ERROR_STYLES,
    ...IMAGE_UPLOAD_CONTAINER_STYLES,
    ...TEXT_FIELD_STYLES,
    ...IMAGE_UPLOAD_STYLES,
    ...SAVE_BUTTON_STYLES,
    ...RETURN_BUTTON_STYLES,
    ...ATTACH_FILE_STYLES,
    ...LARGE_STYLES,
    ...TABS_STYLES,
    ...CONTROLS_BLOCK_STYLES
  };
});
