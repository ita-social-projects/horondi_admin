import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  detailsBtn: ({ darkMode }) => ({
    color: darkMode ? '#ffffff' : '#3F51B5',
    background: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none !important',
      borderBottom: darkMode ? '1px solid #ffffff' : '1px solid #3F51B5 '
    }
  }),
  noRecordsTitle: {
    fontSize: 20,
    color: theme.palette.text.disabled,
    fontWeight: '500'
  }
}));
