import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  filterWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    flexWrap: 'wrap',
    '@media (max-width: 450px)': {
      width: '100%'
    }
  },
  filterItems: {
    marginTop: '-20px',
    display: 'flex',
    marginRight: 20,
    flexWrap: 'wrap',
    '@media (max-width: 450px)': {
      marginRight: 0
    }
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
    marginBottom: 10,
    '@media (max-width: 450px)': {
      width: '100%'
    }
  },
  filterNavbar: {
    marginTop: -75,
    '@media (max-width: 450px)': {
      marginTop: 0
    }
  }
}));
