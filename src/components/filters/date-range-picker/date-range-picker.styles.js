import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    },
    '& .rs-picker-date .rs-picker-toggle.rs-btn-sm, .rs-picker-daterange .rs-picker-toggle.rs-btn-sm:hover':
      {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        transition:
          'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
      },
    display: 'flex',
    alignItems: 'center',
    width: 290,
    height: '36px',
    '@media (max-width: 450px)': {
      width: '95%',
      margin: 'auto'
    },
    '& div': {
      width: '100%'
    }
  },
  date: {
    width: 290,
    '& span': {
      color: '#828282'
    }
  },
  menu: {
    width: 290,
    '& .rs-picker-toolbar-right-btn-ok': {
      backgroundColor: '#3f51b5',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#3f51b5',
        color: '#ffffff'
      }
    },
    '& .rs-calendar-table-cell-selected .rs-calendar-table-cell-content': {
      backgroundColor: '#3f51b5',
      borderColor: '#3f51b5'
    },
    '& .rs-picker-daterange-panel-show-one-calendar .rs-picker-toolbar': {
      maxWidth: 290
    },
    '& .rs-picker-toolbar-ranges': {
      marginBottom: 12
    }
  }
}));
