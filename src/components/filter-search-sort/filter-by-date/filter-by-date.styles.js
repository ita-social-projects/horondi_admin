import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  datePicker: {
    width: 260,
    '& span': { color: '#828282 !important' },
    '& a.rs-btn.rs-btn-default.rs-picker-toggle.active.rs-btn-md': {
      borderColor: 'black !important'
    },
    '& toggle.active': { borderColor: 'red !important' },
    '& span.rs-picker-toggle-clean': { color: '#ffffff !important' }
  },
  menuPicker: {
    '& button': {
      backgroundColor: '#3f51b5 !important',
      color: '#ffffff !important'
    },
    '& .rs-calendar-table-cell-selected .rs-calendar-table-cell-content': {
      backgroundColor: '#3f51b5 !important',
      borderColor: '#3f51b5 !important'
    },
    '& toggle.active': { borderColor: 'red !important' }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    '@media (max-width: 450px)': {
      width: '100%'
    }
  }
}));
