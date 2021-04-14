import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  filterWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  filterItems: {
    marginTop: '-20px',
    display: 'flex',
    marginRight: 20
  },
  detailsBtn: {
    color: '#3F51B5',
    background: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      borderBottom: '1px solid #3F51B5 '
    }
  },
  filterByDate: {
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  filterNavbar: {
    marginTop: -75
  }
}));
