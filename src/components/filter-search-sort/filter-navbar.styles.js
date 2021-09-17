import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    margin: '30px 0',
    display: 'flex',
    flexWrap: 'wrap',
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'center',
    spacing: 2,
    '@media (max-width: 450px)': {
      width: '100%',
      '& .MuiGrid-item': {
        width: '100%',
        marginTop: '10px'
      }
    }
  },
  dateRange: {
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 900px)': {
      width: '100%'
    }
  },
  dateRangeItem: {
    marginRight: 10
  },
  multipleValues: {
    marginTop: -20,
    marginRight: 10,
    '@media (max-width: 900px)': {}
  },
  sortItem: {
    marginRight: 15,
    '@media (max-width: 900px)': {
      marginLeft: '8px',
      marginRight: '8px'
    }
  }
}));
