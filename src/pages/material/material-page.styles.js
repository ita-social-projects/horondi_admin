import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableNav: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  paginationDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  colorsCell: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '15px',
    marginTop: '-25px'
  }
}));
