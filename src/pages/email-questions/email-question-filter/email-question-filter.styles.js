import { makeStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiButton-root': {
      padding: '6px !important'
    },
    marginTop: '-20px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 'fit-content'
  }
}));
