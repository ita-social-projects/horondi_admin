import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    },
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 260,
    height: '36px',
    '@media (max-width: 450px)': {
      width: '95%',
      margin: 'auto'
    },
    '& div': {
      width: '100%'
    }
  },
  datePicker: {
    width: 260,
    '& span': { color: '#828282 !important' },
    '& a.rs-btn.rs-btn-default.rs-picker-toggle.active.rs-btn-md': {
      borderColor: 'black !important'
    },
    '& toggle.active': { borderColor: 'red !important' }
  },
  menuPicker: {
    '& button': {
      backgroundColor: '#3f51b5 !important',
      color: '#ffffff !important'
    },
    '& .rs-calendar-table-cell-selected .rs-calendar-table-cell-content': {
      backgroundColor: '#3f51b5 !important',
      borderColor: '#3f51b5 !important'
    }
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

export const dateRangePickerCustomStyles = {
  lightCSS:
    '.rs-picker-daterange-header, .rs-calendar, .rs-picker-toolbar, a.rs-btn {background: transparent} .rs-calendar-table-cell-content:hover {background: rgb(0 0 0 / 6%)} .rs-btn-default.active {background: transparent !important} .rs-picker-toolbar-option span {color: #3f51b5 !important}',
  darkCSS:
    '.rs-picker-daterange-header, .rs-calendar, .rs-picker-toolbar, a.rs-btn {background: #424242; border: none} .rs-calendar-table-cell-content:hover {background: #3f51b5} .rs-btn-default.active {background: #424242 !important} .rs-picker-toolbar-option span {color: #fff !important} .rs-picker-toolbar-option:hover {text-decoration: none}'
};
