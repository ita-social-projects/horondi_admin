import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableNav: {
    padding: theme.spacing(1)
  },
  wrapper: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiButton-root': {
      padding: '6px !important'
    }
  },
  clearButton: {
    height: '36px'
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    height: '36px'
  },
  iconButton: {
    padding: 10
  },
  select: {
    marginLeft: '.5rem',
    marginRight: '17px !important',
    display: 'inline-block',
    '& .MuiOutlinedInput-input': {
      height: '25px',
      fontSize: '13px',
      padding: '0 1.2rem 0 .4rem'
    },
    '& .MuiOutlinedInput-input:focus': {
      borderColor: 'black'
    },
    '& svg': {
      right: '0'
    }
  },
  sort: {
    display: 'flex',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex'
  },
  search: {
    display: 'flex'
  }
}));
