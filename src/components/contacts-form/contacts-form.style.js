import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    ATTACH_FILE_STYLES,
    IMAGE_UPLOAD_STYLES,
    IMAGE_UPLOAD_CONTAINER_STYLES,
    LARGE_STYLES,
    RETURN_BUTTON_STYLES,
    SAVE_BUTTON_STYLES,
    DETAILS_STYLES,
    INPUT_ERROR_STYLES,
    IMAGE_NAME_STYLE
  } = formStyles(theme);
  return {
    contactItemUpdate: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      paddingTop: 10
    },
    textField: {
      '&:first-letter': {
        textTransform: 'capitalize'
      },
      margin: '10px'
    },
    detailsContainer: {
      width: '100%',
      padding: 20,
      marginTop: 70
    },
    contactDetails: {
      ...DETAILS_STYLES
    },
    ...SAVE_BUTTON_STYLES,
    ...RETURN_BUTTON_STYLES,
    ...INPUT_ERROR_STYLES,
    ...IMAGE_UPLOAD_CONTAINER_STYLES,
    ...LARGE_STYLES,
    ...IMAGE_NAME_STYLE,
    ...IMAGE_UPLOAD_STYLES,
    ...ATTACH_FILE_STYLES
  };
});
