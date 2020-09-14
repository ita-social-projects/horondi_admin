import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  select: {
    marginLeft: '.5rem',
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
  }
}));
