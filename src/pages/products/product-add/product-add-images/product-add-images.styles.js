import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { imageUploadAvatar } = formStyles(theme);

  return {
    imageUploadAvatar,
    container: {
      display: 'flex',
      position: 'relative',
      flexWrap: 'wrap'
    },
    box: {
      margin: '24px auto 24px'
    },
    error: {
      color: theme.palette.error.main,
      padding: '10px 0 0 0'
    },
    chipContainer: {
      display: 'grid',
      gridTemplateColumns: '190px 1fr',
      marginBottom: theme.spacing(2)
    },
    chips: {
      '& div': {
        margin: '4px 6px'
      }
    },
    avatarWrapper: {
      display: 'flex',
      '& div': {
        margin: '5px 10px 0 0'
      }
    },
    text: {
      marginLeft: '10px',
      alignItems: 'center'
    },
    additionalImages: {
      display: 'flex'
    },
    displayNone: {
      display: 'none!important'
    },
    display: {
      display: 'block'
    }
  };
});
