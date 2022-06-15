import makeStyles from '@material-ui/core/styles/makeStyles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250
    }
  }
};

export const useStyles = makeStyles((theme) => ({
  formblock: {
    marginRight: '7px',
    '&>span': {
      width: '100%'
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    '@media (max-width: 450px)': {
      minWidth: '100% !important',
      maxWidth: '100%'
    }
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));
