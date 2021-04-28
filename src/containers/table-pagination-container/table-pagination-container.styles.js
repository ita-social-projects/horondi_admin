import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    margin: '0 10px',
    '& input': {
      width: '40px',
      height: '16px',
      padding: '10px'
    }
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    '@media (max-width: 450px)': {
      width: '280px',
      margin: 'auto',
      padding: 0,
      '& .MuiTablePagination-toolbar': {
        flexWrap: 'wrap',
        padding: 0
      },
      '& .MuiTablePagination-selectRoot': {
        'margin-right': 0,
        'margin-left': 0
      },
      '& li': {
        width: '30px'
      }
    }
  },
  goToPage: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 15px',
    position: 'relative'
  },
  error: {
    color: '#e60000',
    position: 'absolute',
    bottom: '-15px'
  }
}));
