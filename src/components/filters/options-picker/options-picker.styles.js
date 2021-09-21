import makeStyles from '@material-ui/core/styles/makeStyles';

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
    width: 160
  }
}));
